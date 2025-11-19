'use client'

import { Factory, Shield, Zap, Globe, Leaf, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Factory,
      title: 'State-of-the-Art Manufacturing',
      description: 'Modern European and Asian technology with 26 fully equipped production lines and real-time quality control.',
    },
    {
      icon: Shield,
      title: 'International Standards',
      description: 'ISO 9001, IEC certified. Every product tested for conductor resistance, tensile strength, and insulation quality.',
    },
    {
      icon: Zap,
      title: 'Complete Product Portfolio',
      description: 'From household wires to high-voltage transmission cables, ACSR conductors, and specialty enamelled winding wires.',
    },
    {
      icon: Globe,
      title: 'Regional Leadership',
      description: 'Trusted supplier to utilities, infrastructure projects, and developers across Ethiopia, Kenya, Tanzania, and beyond.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Manufacturing',
      description: 'Energy-efficient processes, recyclable materials, and waste management aligned with Ethiopia\'s Green Economy Strategy.',
    },
    {
      icon: Award,
      title: 'Proven Excellence',
      description: 'Partner to Ethiopian Electric Utility, major construction firms, and Belt & Road Initiative infrastructure projects.',
    },
  ]

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {'Why Choose Addis Cable'}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            {'We\'re more than a cable manufacturer—we\'re infrastructure partners committed to powering Africa\'s progress through engineering excellence and uncompromising quality.'}
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                rotateY: 5,
                rotateX: 5,
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group p-8 rounded-xl border border-border bg-card hover:bg-accent/5 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              <motion.div 
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
