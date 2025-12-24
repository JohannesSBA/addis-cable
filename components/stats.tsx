"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      value: "13,836",
      label: "Tons Annual Capacity",
      description: "Combined copper & aluminum production",
    },
    {
      value: "26",
      label: "Production Lines",
      description: "Advanced manufacturing equipment",
    },
    {
      value: "300+",
      label: "Product Variations",
      description: "Complete cable solutions portfolio",
    },
  ];

  const [heroStat, ...otherStats] = stats;

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#05070d] text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-10 rounded-[28px] border border-white/5" />
      </div>
      <div className="relative max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/60">
            Output Signals
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-balance">
            Copper-grade productivity tuned for Ethiopia's build-out
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Precision factories, redundant lines, and future-proofed chemistries
            keep Addis Cable delivering when national infrastructure can't
            stall.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative rounded-[24px] sm:rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute -top-16 -right-24 w-72 h-72 bg-gradient-to-br from-[var(--accent)]/25 to-white/10 blur-3xl"
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
              />
              <div className="absolute inset-6 rounded-[28px] border border-white/10 opacity-60" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-white/70">
                  Core Throughput
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
              </div>
              <div className="flex flex-col gap-6">
                <motion.div
                  className="text-6xl font-bold text-[var(--accent)]"
                  initial={{ scale: 0.5 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {heroStat.value}
                </motion.div>
                <p className="text-2xl font-semibold text-white">
                  {heroStat.label}
                </p>
                <p className="text-white/70">{heroStat.description}</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  {["Copper Rod", "Aluminum", "Hybrid"].map((item, index) => (
                    <motion.div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 py-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                        {item}
                      </p>
                      <p className="text-lg font-semibold text-[var(--accent)]/85">
                        {["9,109t", "4,727t", "Rapid"][index]}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {otherStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white/5 rounded-3xl border border-white/10 px-6 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-6">
                  {stat.label}
                </p>
                <p className="text-4xl font-bold text-[var(--accent)] mb-3">
                  {stat.value}
                </p>
                <p className="text-sm text-white/70">{stat.description}</p>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-full rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/5 to-transparent px-6 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-4">
                National Footprint
              </p>
              <p className="text-white/75 leading-relaxed">
                Field teams support EEU projects, industrial parks, and real
                estate developments across Ethiopia with responsive delivery and
                on-site technical coordination.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
