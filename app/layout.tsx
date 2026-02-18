import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.addiscable.com"),
  title: {
    default:
      "Addis Cable Manufacturing PLC | Ethiopia's Leading Cable & Conductor Manufacturer",
    template: "%s | Addis Cable Manufacturing PLC",
  },
  applicationName: "Addis Cable Manufacturing PLC",
  description:
    "Addis Cable Manufacturing PLC supplies Addis Ababa and Ethiopia with certified copper and aluminum electrical cables, conductors, and winding wires for utilities, infrastructure, industry, and real estate projects.",
  keywords: [
    "Addis Cable",
    "Addis Ababa cable",
    "Ethiopia cables",
    "Ethiopian wires",
    "electrical cables Ethiopia",
    "power cables Addis",
    "wires in Ethiopia",
    "copper cable manufacturer Ethiopia",
    "aluminum cable manufacturer Ethiopia",
    "conductors Ethiopia",
  ],
  category: "Manufacturing",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.addiscable.com",
    siteName: "Addis Cable Manufacturing PLC",
    title:
      "Addis Cable Manufacturing PLC | Ethiopia's Leading Cable & Conductor Manufacturer",
    description:
      "Ethiopia's trusted source for copper and aluminum power cables, conductors, and winding wires serving Addis Ababa and nationwide infrastructure.",
    images: ["/Addis_in_night.png"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Addis Cable Manufacturing PLC | Ethiopia's Leading Cable & Conductor Manufacturer",
    description:
      "Certified copper and aluminum electrical cables engineered in Ethiopia for utilities, industrial parks, rail, and real estate projects.",
    images: ["/Addis_in_night.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      "/favicon.ico",
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "Yv08BcKxGBXuAJfHLLv-uEiTb2pHQdmfB5PCZJx0dZU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Addis Cable Manufacturing PLC",
    url: "https://www.addiscable.com",
    logo: "https://www.addiscable.com/logo.jpeg",
    sameAs: ["https://www.addiscable.com"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gelan Industrial Zone, Sheger City",
      addressLocality: "Sheger City",
      addressRegion: "Oromia",
      addressCountry: "ET",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Sales & Customer Support",
        email: "info@addiscable.com",
        areaServed: "ET",
        availableLanguage: ["en"],
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Addis Cable Manufacturing PLC",
    url: "https://www.addiscable.com",
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://www.addiscable.com/resources/product-catalog?search={query}",
      "query-input": "required name=query",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
