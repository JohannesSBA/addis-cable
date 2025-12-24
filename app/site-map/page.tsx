import Link from "next/link";

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
    <main className="bg-[#0a0c12] text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Sitemap</h1>
        <p className="text-white/75 mb-8">
          Quick links to key product, company, and resource pages across the Addis Cable site.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-primary/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
