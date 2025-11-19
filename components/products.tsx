'use client'

import { Cable, Zap, TowerControl, Wind } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export function Products() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const products = [
    {
      icon: Cable,
      category: 'Low Voltage Cables',
      voltage: 'Up to 1 kV',
      description: 'PVC insulated & sheathed cables for residential, commercial, and light industrial applications.',
      standards: 'IEC 60227 | ES Standards',
      image: '/electrical-copper-cables-coiled-on-industrial-spoo.jpg',
    },
    {
      icon: Zap,
      category: 'Medium Voltage Cables',
      voltage: '3.8 kV - 33 kV',
      description: 'XLPE insulation for urban networks, industrial plants, and renewable energy installations.',
      standards: 'IEC 60502-2',
      image: '/high-voltage-power-transmission-cables-cross-secti.jpg',
    },
    {
      icon: TowerControl,
      category: 'High Voltage Cables',
      voltage: 'Above 33 kV',
      description: 'Steel wire armored cables with metallic screening for transmission lines and substations.',
      standards: 'IEC 60840 | Fully Type-Tested',
      image: '/industrial-power-plant-cable-installation.jpg',
    },
    {
      icon: Wind,
      category: 'Conductors & ABC',
      voltage: 'AAC, ACSR, AAAC',
      description: 'High tensile strength, corrosion & UV resistant conductors for overhead power distribution.',
      standards: 'IEC 61089 | ASTM B232',
      image: '/overhead-aluminum-power-transmission-conductors.jpg',
    },
  ]

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {'Engineered for Africa\'s Power Infrastructure'}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            {'Our complete portfolio delivers reliable, high-performance cables designed to withstand Ethiopia\'s diverse climates—from highland regions to humid lowlands.'}
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
            >
              <motion.div 
                className="aspect-video overflow-hidden bg-muted relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={product.image || "/placeholder.svg"}
                  alt={product.category}
                  className="w-full h-full object-cover"
                  animate={{ 
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <product.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <motion.span 
                    className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.1 }}
                  >
                    {product.voltage}
                  </motion.span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{product.category}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
                <div className="text-sm text-muted-foreground font-mono">{product.standards}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-8 rounded-xl bg-primary/10 border border-primary/20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{'Specialty: Enamelled Winding Wires'}</h3>
              <p className="text-muted-foreground">
                {'Unique capability in Ethiopia. Thermal classes 130L-200+°C for motors, generators, and transformers.'}
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="whitespace-nowrap px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {'Download Specifications'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
