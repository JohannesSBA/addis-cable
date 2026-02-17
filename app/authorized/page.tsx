"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  CircleDashed,
  Loader2,
  QrCode,
  RefreshCw,
  ScanLine,
  VideoOff,
} from "lucide-react";
import type { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ScanState = "idle" | "requesting" | "scanning" | "found" | "error";

type ParsedCode = {
  size: string;
  encryptedId: string;
};

function parseQrPayload(rawText: string): ParsedCode | null {
  const cleaned = rawText.trim();
  if (!cleaned) return null;

  const segmentsToResult = (segments: string[]): ParsedCode | null => {
    const idx = segments.findIndex(
      (segment) => segment.toLowerCase() === "authorized",
    );
    if (idx !== -1 && segments.length >= idx + 3) {
      return {
        size: segments[idx + 1],
        encryptedId: decodeURIComponent(segments[idx + 2]),
      };
    }
    return null;
  };

  try {
    const url = new URL(cleaned);
    const fromPath = segmentsToResult(url.pathname.split("/").filter(Boolean));
    if (fromPath) return fromPath;

    const sizeParam =
      url.searchParams.get("size") ??
      url.searchParams.get("s") ??
      url.searchParams.get("gauge");
    const idParam =
      url.searchParams.get("id") ??
      url.searchParams.get("code") ??
      url.searchParams.get("encryptedId") ??
      url.searchParams.get("qr");
    if (sizeParam && idParam) {
      return { size: sizeParam, encryptedId: idParam };
    }
  } catch {
    // not a URL; fall through to other strategies
  }

  const manualPath = segmentsToResult(cleaned.split("/").filter(Boolean));
  if (manualPath) return manualPath;

  const compactMatch = cleaned.match(/authorized[:/\\]?([^/\\]+)[/\\]?(.+)$/i);
  if (compactMatch) {
    return {
      size: compactMatch[1],
      encryptedId: decodeURIComponent(compactMatch[2]),
    };
  }

  const tokens = cleaned.split(/[\s,;|]+/).filter(Boolean);
  if (tokens.length >= 2 && /^[0-9.]/.test(tokens[0])) {
    return { size: tokens[0], encryptedId: tokens.slice(1).join(" ") };
  }

  return null;
}

export default function AuthorizedLanding() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [statusText, setStatusText] = useState(
    "Align the QR label inside the frame.",
  );
  const [errorText, setErrorText] = useState<string | null>(null);
  const [lastRawValue, setLastRawValue] = useState<string>("");
  const [manualValue, setManualValue] = useState("");
  const [hasNavigated, setHasNavigated] = useState(false);

  const stopScanning = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;
    const maybeResettable = readerRef.current as unknown as {
      reset?: () => void;
    } | null;
    maybeResettable?.reset?.();
    readerRef.current = null;

    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setScanState("idle");
  }, []);

  const handleParsedResult = useCallback(
    (payload: string, source: "camera" | "manual") => {
      const parsed = parseQrPayload(payload);
      setLastRawValue(payload);

      if (!parsed) {
        setScanState("error");
        setErrorText("QR read, but format could not be parsed. Paste manually?");
        return;
      }

      if (hasNavigated) return;

      setHasNavigated(true);
      setScanState("found");
      setStatusText(
        source === "camera" ? "Code captured. Redirecting…" : "Opening result…",
      );
      stopScanning();
      const href = `/authorized/${encodeURIComponent(parsed.size)}/${encodeURIComponent(parsed.encryptedId)}`;
      router.push(href);
    },
    [hasNavigated, router, stopScanning],
  );

  const startScanning = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!videoRef.current) return;

    setErrorText(null);
    setHasNavigated(false);
    setScanState("requesting");
    setStatusText("Requesting camera access…");

    try {
      const { BrowserMultiFormatReader } = await import("@zxing/browser");
      const reader = new BrowserMultiFormatReader();
      readerRef.current = reader;

      const controls = await reader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, err, controlsInstance) => {
          if (controlsInstance && controlsRef.current !== controlsInstance) {
            controlsRef.current = controlsInstance;
          }

          if (result) {
            setScanState("found");
            handleParsedResult(result.getText(), "camera");
          } else if (err && (err as { name?: string }).name !== "NotFoundException") {
            // Ignore routine "not found" ticks while scanning
            setStatusText("Hold steady… scanning");
          }
        },
      );

      controlsRef.current = controls;
      setScanState("scanning");
      setStatusText("Camera active. Aim at the QR label.");
      if (videoRef.current) {
        videoRef.current.playsInline = true;
        videoRef.current.muted = true;
      }
    } catch (error) {
      console.error("QR camera start failed", error);
      setScanState("error");
      setErrorText(
        error instanceof Error
          ? error.message
          : "Unable to start the camera. Check permissions and reload.",
      );
    }
  }, [handleParsedResult]);

  useEffect(() => {
    startScanning();
    return () => stopScanning();
  }, [startScanning, stopScanning]);

  const statusBadge = useMemo(() => {
    switch (scanState) {
      case "scanning":
        return { label: "Scanning", icon: ScanLine, tone: "text-emerald-200" };
      case "requesting":
        return { label: "Requesting camera", icon: Loader2, tone: "text-amber-200" };
      case "found":
        return { label: "Code found", icon: CheckCircle2, tone: "text-cyan-200" };
      case "error":
        return { label: "Camera issue", icon: AlertTriangle, tone: "text-rose-200" };
      default:
        return { label: "Idle", icon: CircleDashed, tone: "text-white/70" };
    }
  }, [scanState]);

  const handleManualSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!manualValue.trim()) return;
      handleParsedResult(manualValue, "manual");
    },
    [handleParsedResult, manualValue],
  );

  return (
    <main className="min-h-screen bg-[#03060d] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-sky-400/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.16),transparent_26%)]" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 space-y-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-white/70">
              <QrCode className="h-4 w-4" />
              Addis Cable Authenticity
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Scan your QR code with the built-in camera
            </h1>
            <p className="text-white/70 max-w-3xl">
              Use your device camera to capture the QR label on your Addis Cable
              reel. We will route you to the verification record and increment the
              scan counter automatically.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
            <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.45)] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                {(() => {
                  const BadgeIcon = statusBadge.icon;
                  return (
                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <BadgeIcon className={`h-5 w-5 ${statusBadge.tone}`} />
                      <span className="font-medium">{statusBadge.label}</span>
                    </div>
                  );
                })()}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={startScanning}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20 transition"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Restart camera
                  </button>
                  <button
                    type="button"
                    onClick={stopScanning}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/15 transition"
                  >
                    <VideoOff className="h-4 w-4" />
                    Stop
                  </button>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="h-48 w-48 sm:h-64 sm:w-64 border-2 border-emerald-400/70 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.45)]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm text-white/80 flex items-center gap-2">
                  {scanState === "requesting" || scanState === "idle" ? (
                    <Camera className="h-4 w-4" />
                  ) : scanState === "error" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-300" />
                  ) : (
                    <ScanLine className="h-4 w-4 text-emerald-300" />
                  )}
                  <span>{errorText ?? statusText}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-white/60">
                <CheckCircle2 className="h-4 w-4" />
                Ensure the label is well lit. If your browser blocks the camera,
                tap the address bar lock icon and grant permission.
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.38)] space-y-4">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white/60">
                  <QrCode className="h-4 w-4" />
                  Manual entry
                </div>
                <p className="text-white/75 text-sm">
                  Paste the QR content or the full URL if the camera is not
                  available. We will parse the size and encrypted id automatically.
                </p>
                <form onSubmit={handleManualSubmit} className="space-y-3">
                  <textarea
                    value={manualValue}
                    onChange={(event) => setManualValue(event.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-black/40 p-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                    rows={4}
                    placeholder="e.g. https://addiscable.com/authorized/16/ENCRYPTED-ID"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-emerald-950 shadow-[0_10px_35px_rgba(16,185,129,0.35)] hover:bg-emerald-400 transition"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Parse & verify
                    </button>
                    <button
                      type="button"
                      onClick={() => setManualValue(lastRawValue)}
                      className="text-xs text-white/60 hover:text-white/90"
                    >
                      Use last scanned value
                    </button>
                  </div>
                </form>
                {lastRawValue && (
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-3 text-xs text-white/70">
                    <div className="text-white/50 mb-1">Last camera read</div>
                    <div className="break-words font-mono text-[11px] text-white/80">
                      {lastRawValue}
                    </div>
                  </div>
                )}
                {errorText && (
                  <div className="flex items-start gap-2 rounded-2xl border border-amber-400/50 bg-amber-500/15 p-3 text-sm text-amber-50">
                    <AlertTriangle className="h-4 w-4 mt-0.5" />
                    <div>
                      <div className="font-medium">We couldn't parse that code</div>
                      <div className="text-amber-100/80">{errorText}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3 text-sm text-white/80 shadow-[0_14px_50px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-2 text-white/60 uppercase tracking-[0.18em] text-xs">
                  <Camera className="h-4 w-4" />
                  Tips
                </div>
                <ul className="list-disc list-inside space-y-2">
                  <li>Use the rear camera on mobile for faster focus.</li>
                  <li>Hold the QR label 15–25 cm away in good light.</li>
                  <li>If redirected automatically, the scan counter is already recorded.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
