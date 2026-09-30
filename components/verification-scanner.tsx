"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { Camera, QrCode, ShieldCheck, VideoOff } from "lucide-react";
import type { IScannerControls } from "@zxing/browser";
import { Arrow } from "./brand";
import { parseQrPayload, verificationPath } from "@/lib/qr-payload";

type ScanState = "idle" | "requesting" | "scanning" | "opening";

export function VerificationScanner({
  resultBaseUrl = "",
}: {
  resultBaseUrl?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const controls = useRef<IScannerControls | null>(null);
  const generation = useRef(0);
  const opening = useRef(false);
  const [state, setState] = useState<ScanState>("idle");
  const [cameraError, setCameraError] = useState("");
  const [formError, setFormError] = useState("");
  const [code, setCode] = useState("");
  const [size, setSize] = useState("");
  const [cameraHint, setCameraHint] = useState("");

  const releaseCamera = useCallback(() => {
    generation.current += 1;
    controls.current?.stop();
    controls.current = null;
    const stream = video.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());
    if (video.current) video.current.srcObject = null;
  }, []);
  useEffect(() => {
    const hidden = () => {
      if (document.hidden) {
        releaseCamera();
        setState("idle");
      }
    };
    document.addEventListener("visibilitychange", hidden);
    return () => {
      document.removeEventListener("visibilitychange", hidden);
      releaseCamera();
    };
  }, [releaseCamera]);

  const openResult = useCallback(
    (raw: string, manualSize?: string) => {
      const parsed = parseQrPayload(raw, manualSize);
      if (!parsed) return false;
      if (opening.current) return true;
      opening.current = true;
      releaseCamera();
      setState("opening");
      window.location.assign(resultBaseUrl + verificationPath(parsed));
      return true;
    },
    [releaseCamera, resultBaseUrl],
  );

  async function startCamera() {
    releaseCamera();
    const session = generation.current;
    setCameraError("");
    setCameraHint("");
    setState("requesting");
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("unavailable");
      const { BrowserMultiFormatReader } = await import("@zxing/browser");
      if (session !== generation.current || !video.current) return;
      const reader = new BrowserMultiFormatReader();
      const scanner = await reader.decodeFromConstraints(
        {
          audio: false,
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
          },
        },
        video.current,
        (result, _error, activeControls) => {
          if (session !== generation.current) {
            activeControls?.stop();
            return;
          }
          controls.current = activeControls;
          if (result && !openResult(result.getText()))
            setCameraHint(
              "This QR code is not an Addis Cable product label. Try the label on the packaging.",
            );
        },
      );
      if (session !== generation.current) {
        scanner.stop();
        return;
      }
      controls.current = scanner;
      setState("scanning");
    } catch (error) {
      if (session !== generation.current) return;
      releaseCamera();
      setState("idle");
      const name =
        error && typeof error === "object" && "name" in error
          ? String(error.name)
          : "";
      setCameraError(
        name === "NotAllowedError"
          ? "Camera access was declined. Allow it in your browser settings, or enter the code below."
          : name === "NotFoundError"
            ? "No camera was found. You can still verify your product using manual entry."
            : "The camera could not start. Check browser permissions, or use manual entry.",
      );
    }
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    setFormError("");
    if (!openResult(code, size))
      setFormError(
        "Paste the full QR label link, or choose a cable size and enter the printed product code.",
      );
  }
  const active = state === "requesting" || state === "scanning";
  return (
    <main id="main-content" className="detail-page verification-page">
      <section className="wrap detail-hero verification-hero">
        <span className="eyebrow">
          <ShieldCheck size={16} aria-hidden="true" /> PRODUCT AUTHENTICITY /
          ADDIS CABLE
        </span>
        <h1>
          Confidence in
          <br />
          <em>every connection</em>
          <span>.</span>
        </h1>
        <p>
          Verify your product before installation. Scan the QR label on your
          cable packaging, or enter its code to check our authenticity records.
        </p>
      </section>
      <section
        className="wrap verification-grid"
        aria-label="Verify your product"
      >
        <article className="scanner-panel">
          <div className="verification-panel-heading">
            <span className="eyebrow">01 / SCAN THE LABEL</span>
            <QrCode size={24} aria-hidden="true" />
          </div>
          <h2>Point. Scan. Verify.</h2>
          <p>
            Use your rear camera in good light. Keep the entire QR label inside
            the frame.
          </p>
          <div className={`scanner-view ${active ? "is-active" : ""}`}>
            <video
              ref={video}
              autoPlay
              playsInline
              muted
              aria-hidden={!active}
              aria-label="Product QR camera preview"
            />
            <div className="scanner-frame" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            {!active && (
              <div className="scanner-idle">
                <QrCode size={66} strokeWidth={1} aria-hidden="true" />
                <span>Your camera starts when you’re ready.</span>
              </div>
            )}
          </div>
          <div className="scanner-actions">
            <button
              type="button"
              className="button copper"
              disabled={state === "opening"}
              onClick={
                active
                  ? () => {
                      releaseCamera();
                      setState("idle");
                    }
                  : startCamera
              }
            >
              {active ? (
                <VideoOff size={18} aria-hidden="true" />
              ) : (
                <Camera size={18} aria-hidden="true" />
              )}
              {active ? "Stop camera" : "Start camera"}
            </button>
            <span role="status" aria-live="polite">
              {state === "requesting"
                ? "Waiting for camera permission…"
                : state === "scanning"
                  ? "Camera active · Scanning"
                  : state === "opening"
                    ? "Code found · Opening verification…"
                    : "Camera off"}
            </span>
          </div>
          {cameraError && (
            <p className="verification-error" role="alert">
              {cameraError}
            </p>
          )}
          {cameraHint && (
            <p className="verification-hint" role="status">
              {cameraHint}
            </p>
          )}
        </article>
        <article className="manual-panel">
          <div className="verification-panel-heading">
            <span className="eyebrow">02 / ENTER MANUALLY</span>
            <Arrow diagonal />
          </div>
          <h2>
            No camera?
            <br />
            No problem.
          </h2>
          <p>
            Paste the complete QR label link. If you have a printed code, select
            the cable size as well.
          </p>
          <form onSubmit={submit} className="verification-form">
            <label htmlFor="cable-size">
              Cable size <span>For printed codes</span>
            </label>
            <select
              id="cable-size"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            >
              <option value="">Choose cable size</option>
              <option value="1.5">1.5 mm²</option>
              <option value="2.5">2.5 mm²</option>
              <option value="4">4 mm²</option>
            </select>
            <label htmlFor="product-code">QR label link or product code</label>
            <textarea
              id="product-code"
              rows={4}
              required
              value={code}
              onChange={(event) => setCode(event.target.value)}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-invalid={!!formError}
              aria-describedby={
                formError ? "verification-form-error" : "code-help"
              }
            />
            <p id="code-help" className="field-note">
              Enter the code exactly as printed. A full label link already
              includes the cable size.
            </p>
            {formError && (
              <p
                id="verification-form-error"
                className="verification-error"
                role="alert"
              >
                {formError}
              </p>
            )}
            <button
              className="button ink"
              type="submit"
              disabled={state === "opening"}
            >
              Verify product <Arrow diagonal />
            </button>
          </form>
          {resultBaseUrl && (
            <p className="verification-service-note">
              Your result opens on addiscable.com, using the existing
              verification records and scan history.
            </p>
          )}
          <a className="text-link" href="/contact">
            Need help with a label? <Arrow diagonal />
          </a>
        </article>
      </section>
      <section
        className="wrap verification-guidance"
        aria-label="Understanding verification results"
      >
        <div>
          <span className="eyebrow">UNDERSTAND YOUR RESULT</span>
          <h2>
            A record you
            <br />
            can check.
          </h2>
        </div>
        <div>
          <h3>First verification</h3>
          <p>
            The code matches an Addis Cable record and has no earlier recorded
            checks.
          </p>
        </div>
        <div>
          <h3>Previously checked</h3>
          <p>
            The code matches a record and has been scanned before. Compare the
            packaging and purchase documents; contact our team if anything seems
            wrong.
          </p>
        </div>
        <div>
          <h3>Code not found</h3>
          <p>
            Check the cable size and code, then contact our team before
            installation if the label remains unrecognized.
          </p>
        </div>
      </section>
    </main>
  );
}
