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
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{'Gelan Industrial Zone, Sheger City, Ethiopia'}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Low Voltage Cables</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medium Voltage Cables</a></li>
              <li><a href="#" className="hover:text-white transition-colors">High Voltage Cables</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conductors & ABC</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Winding Wires</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quality Standards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partnerships</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Product Catalog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technical Specs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Installation Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            {'© 2025 Addis Cable Manufacturing PLC. All rights reserved.'}
          </p>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
