export const metadata = {
  title: "Site Map",
  description:
    "Discover Addis Cable Manufacturing PLC: precision electrical cables and conductors, proudly manufactured in Ethiopia.",
  alternates: { canonical: "/site-map" },
};
import { Arrow } from "@/components/brand";

const links = [
  { label: "Low Voltage Cables", href: "/products/low-voltage" },
  { label: "Medium Voltage Cables", href: "/products/medium-voltage" },
  { label: "High Voltage Cables", href: "/products/high-voltage" },
  { label: "Conductors & ABC", href: "/products/conductors-abc" },
  { label: "Winding Wires", href: "/products/winding-wires" },
  { label: "About Us", href: "/company/about-us" },
  { label: "Our Story", href: "/company/our-story" },
  { label: "Quality Standards", href: "/company/quality-standards" },
  { label: "Sustainability", href: "/company/sustainability" },
  { label: "Partnerships", href: "/company/partnerships" },
  { label: "Product Catalog", href: "/resources/product-catalog" },
  { label: "Technical Specs", href: "/resources/technical-specs" },
  { label: "Installation Guides", href: "/resources/installation-guides" },
  { label: "Certifications", href: "/resources/certifications" },
  { label: "Contact Support", href: "/resources/contact-support" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export default function SitemapPage() {
  return (
    <main id="main-content" className="detail-page">
      <section className="detail-hero wrap">
        <span className="eyebrow">FIND YOUR CONNECTION</span>
        <h1>
          Explore Addis Cable<span>.</span>
        </h1>
        <p>
          Products, manufacturing expertise, and resources for your next
          project.
        </p>
      </section>
      <section className="wrap site-map-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
            <Arrow diagonal />
          </a>
        ))}
      </section>
    </main>
  );
}
