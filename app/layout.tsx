import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
const origin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://addis-cable.zippy-field-2275.chatgpt.site";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "Addis Cable — Powering What Comes Next",
    template: "%s | Addis Cable",
  },
  description:
    "Precision copper and aluminum electrical cables, conductors, and winding wires. Proudly manufactured in Ethiopia for homes, utilities, industry, and infrastructure.",
  applicationName: "Addis Cable Manufacturing PLC",
  category: "Manufacturing",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: origin,
    siteName: "Addis Cable Manufacturing PLC",
    title: "Addis Cable — Powering What Comes Next",
    description: "Engineered in Ethiopia. Precision in every strand.",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Addis Cable — The power behind progress",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Addis Cable — Powering What Comes Next",
    description: "Engineered in Ethiopia. Precision in every strand.",
    images: ["/brand/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Addis Cable Manufacturing PLC",
        url: origin,
        logo: origin + "/brand/logo.svg",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Gelan Industrial Zone",
          addressLocality: "Sheger City",
          addressRegion: "Oromia",
          addressCountry: "ET",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Sales",
          email: "info@addiscable.com",
          telephone: "+251114627841",
          areaServed: "ET",
        },
      },
      {
        "@type": "WebSite",
        name: "Addis Cable Manufacturing PLC",
        url: origin,
        inLanguage: "en",
      },
    ],
  };
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
