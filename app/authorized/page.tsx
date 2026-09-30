import type { Metadata } from "next";
import { VerificationScanner } from "@/components/verification-scanner";

export const metadata: Metadata = {
  title: "Verify product",
  description:
    "Scan your Addis Cable QR label or enter the printed product code to check authenticity.",
  alternates: { canonical: "/authorized" },
  robots: { index: false, follow: false },
};
export default function VerifyProductPage() {
  return <VerificationScanner />;
}
