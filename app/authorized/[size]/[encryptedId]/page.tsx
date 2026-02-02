import { verifyCable } from "@/lib/qr-verification";
import {
  AlertTriangle,
  CheckCircle2,
  History,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ size: string; encryptedId: string }>;
};

const theme = {
  fresh: {
    gradient: "from-emerald-500/35 via-emerald-400/15 to-teal-500/5",
    card: "bg-emerald-500/5 border-emerald-400/40",
    badge: "bg-emerald-500/20 text-emerald-50 border border-emerald-400/60",
    icon: CheckCircle2,
    tone: "text-emerald-100",
    headline: "Authentic Addis Cable — first verification",
    subtitle:
      "This QR code matches our database and has never been checked before. You can proceed with confidence.",
  },
  repeat: {
    gradient: "from-amber-400/45 via-amber-300/22 to-yellow-400/12",
    card: "bg-amber-500/12 border-amber-400/55",
    badge: "bg-amber-400/25 text-amber-50 border border-amber-300/70",
    icon: AlertTriangle,
    tone: "text-amber-100",
    headline: "Authenticated but previously checked",
    subtitle:
      "This code is in our database, but it has been scanned before. Confirm packaging integrity or contact Addis Cable before use.",
  },
  invalid: {
    gradient: "from-rose-600/40 via-rose-500/20 to-amber-600/20",
    card: "bg-rose-600/15 border-rose-400/50",
    badge: "bg-rose-600/20 text-rose-50 border border-rose-400/70",
    icon: XCircle,
    tone: "text-rose-100",
    headline: "Code not recognized in Addis Cable records",
    subtitle:
      "This QR code is not present in our authenticity database. Do not install the product until our team reviews it.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { size, encryptedId } = await params;
  const decodedId = decodeURIComponent(encryptedId);
  return {
    title: `Authorized verification | ${size}mm² cable`,
    description:
      "Verify Addis Cable product authenticity by QR code against the official manufacturing database.",
    alternates: {
      canonical: `/authorized/${size}/${decodedId}`,
    },
  };
}

export default async function AuthorizedCheckPage({ params }: PageProps) {
  const { size, encryptedId } = await params;
  const decodedId = decodeURIComponent(encryptedId);
  let verification: Awaited<ReturnType<typeof verifyCable>>;

  try {
    verification = await verifyCable(size, decodedId);
  } catch (error) {
    console.error("Authenticity lookup failed:", error);
    verification = {
      status: "invalid",
      sizeLabel: size,
      encryptedId: decodedId,
      scanCount: 0,
    };
  }
  const visual = theme[verification.status];
  const Icon = visual.icon;

  const updatedCount =
    verification.status === "invalid"
      ? verification.scanCount
      : verification.scanCount + 1;

  return (
    <main className="min-h-screen bg-[#04070f] text-white">
      <section className="relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} blur-3xl opacity-70`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_30%)]" />

        <div className="relative max-w-5xl mx-auto px-4 py-24 space-y-10">
          <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/60">
            <ShieldCheck className="h-4 w-4" />
            Addis Cable Authenticity
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_25px_90px_rgba(0,0,0,0.5)] overflow-hidden">
            <div
              className={`px-8 py-10 border-b border-white/10 bg-gradient-to-r ${visual.gradient}`}
            >
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${visual.badge}`}>
                  <Icon className="h-4 w-4" />
                  {verification.status === "fresh"
                    ? "Authentic • First check"
                    : verification.status === "repeat"
                      ? "Authentic • Repeated"
                      : "Not recognized"}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/15 text-white/80 border border-white/20">
                  Size {size} mm²
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
                  Counter {verification.scanCount} → {updatedCount}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mt-6 leading-tight text-white">
                {visual.headline}
              </h1>
              <p className="text-white/75 mt-2 max-w-3xl text-lg">
                {visual.subtitle}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 px-8 py-10">
              <div className="md:col-span-2 space-y-6">
                <div
                  className={`rounded-2xl p-6 border ${visual.card} shadow-[0_15px_50px_rgba(0,0,0,0.35)]`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`h-5 w-5 ${visual.tone}`} />
                    <div className="text-sm uppercase tracking-[0.18em] text-white/60">
                      Status detail
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <DetailRow
                      label="Database record"
                      value={
                        verification.status === "invalid"
                          ? "Not found"
                          : "Found in authorized tables"
                      }
                    />
                    <DetailRow
                      label="Scan counter (before this check)"
                      value={`${verification.scanCount}`}
                    />
                    <DetailRow
                      label="Counter after recording"
                      value={`${updatedCount}`}
                    />
                    <DetailRow
                      label="Table used"
                      value={verification.tableName ?? "—"}
                    />
                    
                    
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <GuidanceCard
                    title="What to do now"
                    tone={visual.card}
                    bullets={
                      verification.status === "fresh"
                        ? [
                            "Keep the label intact for project records.",
                            "Store the reel indoors until installation.",
                            "Provide this page to inspectors if requested.",
                          ]
                        : verification.status === "repeat"
                          ? [
                              "Confirm the reel was not opened previously.",
                              "Cross-check purchase docs against the QR number.",
                              "Contact Addis Cable support before energizing.",
                            ]
                          : [
                              "Quarantine the cable and halt installation.",
                              "Share a photo of the QR label with support.",
                              "Purchase only from authorized Addis Cable distributors.",
                            ]
                    }
                  />
                  <GuidanceCard
                    title="Support contacts"
                    tone="bg-white/5 border-white/15"
                    bullets={[
                      "Email: info@addiscable.com",
                      "Phone: +251 114 62 78 41",
                      "Phone: +251 986 09 11 48",
                      "Site: addiscable.com/contact",
                    ]}
                  />
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_12px_45px_rgba(0,0,0,0.35)]">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Scan counter</span>
                    <History className="h-4 w-4 opacity-70" />
                  </div>
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-4xl font-bold text-white">
                      {verification.scanCount}
                    </span>
                    <span className="text-sm text-white/50">
                      before this lookup
                    </span>
                  </div>
                  <div className="text-xs text-white/60 mt-2">
                    Updated to {updatedCount} after recording this check.
                  </div>
                </div>

                
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-white/10 last:border-0">
      <span className="text-sm text-white/60">{label}</span>
      <span
        className={`text-sm sm:text-base font-medium ${
          mono ? "font-mono break-all text-white/80" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function GuidanceCard({
  title,
  bullets,
  tone,
}: {
  title: string;
  bullets: string[];
  tone: string;
}) {
  return (
    <div
      className={`rounded-2xl border ${tone} p-5 shadow-[0_10px_40px_rgba(0,0,0,0.3)]`}
    >
      <div className="text-sm uppercase tracking-[0.18em] text-white/60 mb-3">
        {title}
      </div>
      <ul className="space-y-2 text-white/80 text-sm leading-relaxed list-disc list-inside">
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
