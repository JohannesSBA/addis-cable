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
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#fdf6ee] to-white overflow-hidden"
    >
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[radial-gradient(circle,_rgba(247,219,196,0.25),_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-x-8 inset-y-8 border border-orange-100/40 rounded-[3rem] opacity-30" />
      <div className="relative max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="uppercase tracking-[0.4em] text-xs text-slate-500">
            Output Signals
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Copper-grade productivity tuned for African mega builds
          </h2>
          <p className="text-lg text-slate-600">
            Precision factories, redundant lines, and future-proofed chemistries
            keep Addis Cable delivering when infrastructure can’t stall.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-white/70 backdrop-blur-xl border border-orange-100/70 p-6 sm:p-10 shadow-[0_40px_90px_rgba(254,184,111,0.15)]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute -top-16 -right-24 w-72 h-72 bg-gradient-to-br from-primary/40 to-orange-200/30 blur-3xl"
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
              />
              <div className="absolute inset-6 rounded-[28px] border border-white/50 opacity-50" />
            </div>
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-6">
                Core Throughput
              </p>
              <div className="flex flex-col gap-6">
                <motion.div
                  className="text-6xl font-bold text-primary"
                  initial={{ scale: 0.5 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {heroStat.value}
                </motion.div>
                <p className="text-2xl font-semibold text-slate-900">
                  {heroStat.label}
                </p>
                <p className="text-slate-600">{heroStat.description}</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  {["Copper Rod", "Aluminum", "Hybrid"].map((item, index) => (
                    <motion.div
                      key={item}
                      className="rounded-2xl border border-orange-100 bg-white/50 py-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                        {item}
                      </p>
                      <p className="text-lg font-semibold text-primary/80">
                        {["9,109t", "4,727t", "Rapid"][index]}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div
              className="hidden md:block absolute -bottom-8 -left-8 w-40 rounded-2xl border border-orange-100 bg-white shadow-xl p-4"
              animate={{ y: [-4, 6, -4] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400 mb-1">
                Dispatch
              </p>
              <p className="text-lg font-semibold text-slate-900">72 hr</p>
              <p className="text-xs text-slate-500">
                Avg. regional delivery window
              </p>
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {otherStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-3xl border border-orange-100 px-6 py-8 shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400 mb-6">
                  {stat.label}
                </p>
                <p className="text-4xl font-bold text-primary mb-3">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-600">{stat.description}</p>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-full rounded-3xl border border-orange-100 bg-gradient-to-br from-primary/10 via-white to-white px-6 py-8 shadow-[0_30px_80px_rgba(254,184,111,0.2)]"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-4">
                Regional Footprint
              </p>
              <p className="text-slate-700">
                Service corridors span Ethiopia, Kenya, Djibouti, Tanzania, and
                emerging Sahel electrification programs with on-ground technical
                teams.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
