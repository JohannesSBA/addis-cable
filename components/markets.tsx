'use client'

import { Building2, Hammer, Train, Sun, Store, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

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
    <section id="markets" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#020710] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),rgba(2,7,16,0.9))]" />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[0.9fr,1.1fr] gap-16 items-start">
        <div className="space-y-8">
          <p className="uppercase tracking-[0.4em] text-xs text-white/50">Deployment</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {'Powering East Africa\'s strategic assets'}
          </h2>
          <p className="text-lg text-white/70">
            {'Addis Cable maps each conductor family to live demand across national utilities, private grids, heavy industry, and distributed energy developers.'}
          </p>
          <div className="space-y-6">
            {[
              { title: 'Mega Grid', text: 'HV transmission, substations, HVDC corridors' },
              { title: 'Urban Growth', text: 'Transit-oriented development, airports, digital campuses' },
              { title: 'Resilience', text: 'Hybrid microgrids, industrial redundancy, mission-critical systems' },
            ].map((item, idx) => (
              <div key={item.title} className="relative pl-8">
                <div className="absolute left-0 top-0 h-full w-px bg-white/15" />
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(231,152,92,0.8)]" />
                <p className="text-sm uppercase tracking-[0.35em] text-white/40">{String(idx + 1).padStart(2, '0')}</p>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {markets.map((market, index) => (
            <motion.div
              key={market.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 transition-all duration-300 group p-6"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),transparent)]" />
              <market.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform relative z-10" />
              <h3 className="text-lg font-semibold mb-2 text-white relative z-10">{market.name}</h3>
              <p className="text-sm text-white/70 relative z-10">{market.description}</p>
              <motion.div
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs uppercase tracking-[0.4em] text-white/50"
                animate={{ rotate: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                AC
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
