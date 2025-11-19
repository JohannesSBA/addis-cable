'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AC</span>
              </div>
              <span className="font-semibold text-lg">Addis Cable</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Products</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Markets</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Download Catalog</Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Get Quote</Button>
          </div>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <a href="#products" className="block text-sm text-muted-foreground hover:text-foreground">Products</a>
            <a href="#about" className="block text-sm text-muted-foreground hover:text-foreground">About</a>
            <a href="#markets" className="block text-sm text-muted-foreground hover:text-foreground">Markets</a>
            <a href="#contact" className="block text-sm text-muted-foreground hover:text-foreground">Contact</a>
            <div className="pt-3 space-y-2">
              <Button variant="ghost" size="sm" className="w-full">Download Catalog</Button>
              <Button size="sm" className="w-full bg-primary text-primary-foreground">Get Quote</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
