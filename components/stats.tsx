'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    {
      value: '13,836',
      label: 'Tons Annual Capacity',
      description: 'Combined copper & aluminum production',
    },
    {
      value: '26',
      label: 'Production Lines',
      description: 'Advanced manufacturing equipment',
    },
    {
      value: '300+',
      label: 'Product Variations',
      description: 'Complete cable solutions portfolio',
    },
    {
      value: '7+',
      label: 'Countries Served',
      description: 'Across East Africa region',
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center lg:text-left"
            >
              <motion.div 
                className="text-4xl sm:text-5xl font-bold text-primary mb-2"
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-base font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
