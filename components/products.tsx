"use client";

import { Cable, Zap, TowerControl } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const products = [
    {
      icon: Cable,
      category: "Low Voltage Cables",
      voltage: "Up to 1 kV",
      description:
        "PVC insulated & jacketed conductors for residential, commercial, and light industrial installations across Ethiopia.",
      standards: "IEC 60227 | ES Standards",
      image: "/low-voltage.jpeg",
    },
    {
      icon: Zap,
      category: "Medium Voltage Cables",
      voltage: "3.8 kV - 33 kV",
      description:
        "XLPE insulated, PVC/PE sheathed cables for urban power networks, industrial zones, and renewable energy projects.",
      standards: "IEC 60502-2",
      image: "/high-voltage-power-transmission-cables-cross-secti.jpg",
    },
    {
      icon: TowerControl,
      category: "Enamelled Wires & Specialty Cables",
      voltage: "Thermal 130-200C+",
      description:
        "High thermal endurance, smooth enamel coating, and uniform finish for motor windings, transformers, and precision equipment.",
      standards: "Full technical specs available",
      image: "/industrial-power-plant-cable-installation.jpg",
    },
  ];

  return (
    <section
      id="products"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#f5f0ea] to-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,148,80,0.08),transparent_45%)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {"Engineered for Ethiopia's power infrastructure"}
          </h2>
          <p className="text-lg text-slate-600 text-pretty leading-relaxed">
            {
              "A comprehensive portfolio built for Ethiopia's environments, from high-altitude industrial zones to humid lowlands, ensuring conductivity, insulation strength, and long-term durability."
            }
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
              className="group bg-white/90 rounded-2xl overflow-hidden border border-orange-100 hover:border-primary/30 transition-all duration-300 shadow-lg hover:-translate-y-2"
            >
                <motion.div
                  className="aspect-video overflow-hidden bg-muted relative border border-[color-mix(in_srgb,var(--aluminum)_30%,transparent)]"
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
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in srgb, var(--primary) 70%, transparent) 0%, color-mix(in srgb, var(--accent) 60%, transparent) 100%)",
                    }}
                  >
                    <product.icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
                  </motion.div>
                  <motion.span
                    className="text-sm font-mono px-3 py-1 rounded-full border"
                    style={{
                      color: "var(--aluminum)",
                      borderColor: "color-mix(in srgb, var(--aluminum) 70%, transparent)",
                      backgroundColor: "rgba(255,255,255,0.04)",
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {product.voltage}
                  </motion.span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  {product.category}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="text-sm text-slate-500 font-mono">
                  {product.standards}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/15 to-accent/20 border border-primary/30"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">
                {"Specialty: Enamelled Winding Wires"}
              </h3>
              <p className="text-muted-foreground">
                {
                  "Unique capability in Ethiopia. Thermal classes 130L-200C+ for motors, generators, and transformers."
                }
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="whitespace-nowrap px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {"Download Full Technical Specifications"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
