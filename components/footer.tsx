import Link from 'next/link'
import { MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AC</span>
              </div>
              <span className="font-semibold text-lg">Addis Cable</span>
            </div>
            <p className="text-sm text-white/70 mb-4">
              {'Wired for Excellence. Building Connections that Power Progress.'}
            </p>
            <div className="flex items-start gap-2 text-sm text-white/70">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--aluminum)]" />
              <span className="text-[color-mix(in srgb,var(--aluminum) 85%, var(--accent) 15%)]">{'Gelan Industrial Zone, Sheger City, Ethiopia'}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/products/low-voltage" className="hover:text-white transition-colors">Low Voltage Cables</Link></li>
              <li><Link href="/products/medium-voltage" className="hover:text-white transition-colors">Medium Voltage Cables</Link></li>
              <li><Link href="/products/high-voltage" className="hover:text-white transition-colors">High Voltage Cables</Link></li>
              <li><Link href="/products/conductors-abc" className="hover:text-white transition-colors">Conductors & ABC</Link></li>
              <li><Link href="/products/winding-wires" className="hover:text-white transition-colors">Winding Wires</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/company/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/company/our-story" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/company/quality-standards" className="hover:text-white transition-colors">Quality Standards</Link></li>
              <li><Link href="/company/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/company/partnerships" className="hover:text-white transition-colors">Partnerships</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/resources/product-catalog" className="hover:text-white transition-colors">Product Catalog</Link></li>
              <li><Link href="/resources/technical-specs" className="hover:text-white transition-colors">Technical Specs</Link></li>
              <li><Link href="/resources/installation-guides" className="hover:text-white transition-colors">Installation Guides</Link></li>
              <li><Link href="/resources/certifications" className="hover:text-white transition-colors">Certifications</Link></li>
              <li><Link href="/resources/contact-support" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            {'© 2025 Addis Cable Manufacturing PLC. All rights reserved.'}
          </p>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
