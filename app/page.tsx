import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Stats } from '@/components/stats'
import { About } from '@/components/about'
import { Factory } from '@/components/factory'
import { Products } from '@/components/products'
import { Markets } from '@/components/markets'
import { Quality } from '@/components/quality'
import { Sustainability } from '@/components/sustainability'
import { Partnership } from '@/components/partnership'
import { Contact } from '@/components/contact'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Stats />
      <Features />
      <About />
      <Factory />
      <Products />
      <Markets />
      <Quality />
      <Sustainability />
      <Partnership />
      <Contact />
      <CTA />
      <Footer />
    </main>
  )
}
