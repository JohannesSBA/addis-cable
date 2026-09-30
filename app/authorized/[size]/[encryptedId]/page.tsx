import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, History, WifiOff } from "lucide-react";
import { Arrow } from "@/components/brand";
import { verifyCable, type VerificationResult } from "@/lib/qr-verification";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Product verification result",
  description:
    "Check your Addis Cable label against our product authenticity records.",
  robots: { index: false, follow: false },
  referrer: "same-origin",
};
type PageProps = { params: Promise<{ size: string; encryptedId: string }> };
const details = {
  fresh: {
    icon: CheckCircle2,
    label: "Record found · First verification",
    headline: "Your code matches an Addis Cable record.",
    message:
      "This is the first recorded check of this label. Keep the packaging and purchase documents for your project records.",
  },
  repeat: {
    icon: History,
    label: "Record found · Previously checked",
    headline: "This label has been checked before.",
    message:
      "The code matches an Addis Cable record. An earlier check can be expected if you or your supplier already scanned it. Compare the packaging and purchase documents, and contact our team if anything seems wrong.",
  },
  invalid: {
    icon: AlertTriangle,
    label: "Code not found",
    headline: "We couldn’t find this product code.",
    message:
      "Check the cable size and enter the code exactly as printed. If the label remains unrecognized, contact Addis Cable before installation.",
  },
  unavailable: {
    icon: WifiOff,
    label: "Verification unavailable",
    headline: "We can’t check this label right now.",
    message:
      "The verification service is temporarily unavailable. This does not indicate whether the product is authentic. Please try again or contact our team for help.",
  },
};
export default async function AuthorizedCheckPage({ params }: PageProps) {
  const { size, encryptedId } = await params;
  let result: VerificationResult;
  try {
    result = await verifyCable(size, encryptedId);
  } catch {
    result = {
      status: "unavailable",
      sizeLabel: size,
      encryptedId,
      scanCount: 0,
    };
  }
  const content = details[result.status];
  const Icon = content.icon;
  const found = result.status === "fresh" || result.status === "repeat";
  const sizeLabel = size === "15" ? "1.5" : size === "25" ? "2.5" : size;
  return (
    <main id="main-content" className="detail-page">
      <section className="wrap detail-hero">
        <a className="breadcrumb" href="/authorized">
          PRODUCT AUTHENTICITY <span>/</span> YOUR RESULT
        </a>
      </section>
      <section
        className={`wrap verification-result ${result.status}`}
        aria-labelledby="result-title"
      >
        <span className="result-badge">
          <Icon size={18} aria-hidden="true" />
          {content.label}
        </span>
        <h1 id="result-title">{content.headline}</h1>
        <p>{content.message}</p>
        <dl>
          <div>
            <dt>Cable size</dt>
            <dd>{sizeLabel} mm²</dd>
          </div>
          <div>
            <dt>Previous recorded checks</dt>
            <dd>{found ? result.scanCount : "—"}</dd>
          </div>
          <div>
            <dt>Checks including this visit</dt>
            <dd>{found ? result.scanCount + 1 : "—"}</dd>
          </div>
        </dl>
        <p>
          {found
            ? "This check has been recorded in the product’s scan history."
            : "No scan count has been recorded for this check."}
        </p>
        <div className="result-actions">
          <a href="/authorized" className="button copper">
            Verify another product <Arrow diagonal />
          </a>
          <a href="/contact" className="text-link">
            Contact our team <Arrow diagonal />
          </a>
        </div>
      </section>
    </main>
  );
}
