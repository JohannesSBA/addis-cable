import { Building2, Hammer, Train, Sun, Store, Zap } from 'lucide-react'

export function Markets() {
  const markets = [
    { icon: Zap, name: 'Power Utilities', description: 'EEU, EEP, rural electrification' },
    { icon: Building2, name: 'Urban Development', description: 'Housing, commercial towers' },
    { icon: Hammer, name: 'Infrastructure', description: 'Roads, airports, industrial parks' },
    { icon: Train, name: 'Transport & Rail', description: 'Railways, signaling systems' },
    { icon: Sun, name: 'Renewable Energy', description: 'Solar, wind, hybrid power' },
    { icon: Store, name: 'Distribution', description: 'Wholesalers across East Africa' },
  ]

  return (
    <section id="markets" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {'Powering East Africa\'s Strategic Sectors'}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            {'Our cables energize the infrastructure that drives economic growth across the region.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-card hover:bg-accent/5 hover:border-primary/30 transition-all duration-300 group"
            >
              <market.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">{market.name}</h3>
              <p className="text-sm text-muted-foreground">{market.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
