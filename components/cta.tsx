import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Phone } from 'lucide-react'

export function CTA() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20" />
          <div className="absolute inset-0 bg-[url('/abstract-copper-wire-mesh-pattern.jpg')] opacity-10" />
          
          <div className="relative px-8 py-16 sm:px-12 sm:py-20 lg:px-16">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                {'Ready to Power Your Next Project?'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
                {'Get in touch with our technical team for product specifications, pricing, or partnership opportunities.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {'Request a Quote'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
                  {'Schedule Consultation'}
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{'Email Us'}</div>
                    <a href="mailto:info@addiscable.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {'info@addiscable.com'}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{'Call Sales'}</div>
                    <a href="tel:+251" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {'+251 (0) XXX XXX XXX'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
