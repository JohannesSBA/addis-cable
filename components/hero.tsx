"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const heroMetrics = [
  { label: "Annual Capacity", value: "13,836t", detail: "Copper & aluminum" },
  { label: "Production Lines", value: "26", detail: "Full-stack processes" },
  { label: "Specialty", value: "Winding Wire", detail: "Thermal 200C+" },
];

const marqueeItems = [
  "EEU",
  "EEP",
  "Industrial Parks",
  "Renewables",
  "National Rail",
  "Real Estate",
];

export function Hero() {
  const slideshowImages = [
    "/slide-optimized/first.jpg",
    "/slide-optimized/2.jpg",
    "/slide-optimized/3.jpg",
    "/slide-optimized/4.jpg",
    "/slide-optimized/5.jpg",
    "/slide-optimized/6.jpg",
    "/slide-optimized/7.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#010208] text-white min-h-[70vh] sm:min-h-[80vh] flex items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slideshowImages[currentSlide]}')`,
                filter: "saturate(0.95)",
              }}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 0.7, scale: 1 }}
              exit={{ opacity: 0.2, scale: 1.01 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(1,2,8,0.12))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "220px 180px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 70%)",
          }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="relative w-full max-w-3xl mr-auto md:ml-32 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--aluminum)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            <Zap className="w-4 h-4" />
            <span>{"Addis Cable"}</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.65)] max-w-3xl"
            style={{ textShadow: "0 12px 35px rgba(0,0,0,0.55)" }}
          >
            {"Rooted in Ethiopia, trusted nationwide"}
          </h1>
          <p
            className="text-white/90 text-base sm:text-lg max-w-2xl leading-relaxed drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
            style={{ textShadow: "0 10px 28px rgba(0,0,0,0.5)" }}
          >
            {
              "High-performance copper and aluminum conductors engineered for Ethiopia's grids, industries, and communities."
            }
          </p>
          <Button
            size="lg"
            className="rounded-2xl bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-[var(--accent)] text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] px-6 sm:px-8 border border-white/10 w-fit"
          >
            {"Discover our portfolio"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="relative bg-[#05070d] text-white/90 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="w-full flex-1 max-w-xl sm:max-w-2xl mx-auto lg:mx-0">
            <div className="rounded-[22px] border border-white/5 bg-white/5 p-4 sm:p-6 lg:p-7 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.28)] space-y-6 sm:space-y-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium border border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.4)]"
              >
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
                <span>{"Engineered for reliability"}</span>
              </motion.div>

              <div className="space-y-5">
                <motion.h2
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-balance text-white leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  {"Powering Ethiopia's future - wired for excellence"}
                </motion.h2>

                <motion.p
                  className="text-base sm:text-lg text-white/70 max-w-3xl text-pretty leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {`Addis Cable Manufacturing PLC is Ethiopia's leading producer of copper and aluminum electrical cables. From our Gelan Industrial Zone base, we deliver world-class conductors that electrify cities, power industries, and connect communities across the nation.`}
                </motion.p>
              </div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    size="lg"
                    className="w-full rounded-2xl bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-[var(--accent)] text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 py-4 text-sm sm:text-base"
                  >
                    {"Contact a Sales Engineer"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-2xl border-[color-mix(in_srgb,var(--accent)_70%,transparent)] bg-white/5 text-white hover:bg-white/10 py-4 text-sm sm:text-base"
                  >
                    {"Download Product Catalog"}
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-6 text-sm text-white/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {["ISO 9001 Certified", "IEC Type-Tested"].map((text, i) => (
                  <motion.div
                    key={text}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-3">
                <motion.div
                  className="flex gap-8 text-[0.65rem] sm:text-xs tracking-[0.35em] uppercase text-white/50 whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[...marqueeItems, ...marqueeItems].map((item, index) => (
                    <div key={item + index} className="flex items-center gap-4">
                      <span>{item}</span>
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-full lg:max-w-sm xl:max-w-md relative mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 bg-gradient-to-br from-white/10 via-white/10 to-transparent border border-white/12 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                    Flagship
                  </p>
                  <h3 className="text-2xl font-semibold">
                    Mega Grid Cable Suite
                  </h3>
                </div>
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <Zap className="w-7 h-7 text-primary" />
                </motion.div>
              </div>

              <p className="text-white/70 mb-6 leading-relaxed text-sm sm:text-base">
                {`High-spec XLPE, armored MV/HV lines, and precision enamelled conductors engineered for Ethiopia's grid build-out and national reliability goals.`}
              </p>

              <div className="grid grid-cols-1 gap-4">
                {heroMetrics.map((metric) => (
                  <motion.div
                    key={metric.label}
                    className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-4"
                    whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.4)" }}
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                        {metric.label}
                      </p>
                      <p className="text-[11px] text-white/50">
                        {metric.detail}
                      </p>
                    </div>
                    <p className="text-xl font-semibold">{metric.value}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="hidden md:block absolute -bottom-12 -left-8 w-52 rounded-2xl border border-white/15 bg-[#050c16]/80 backdrop-blur-xl p-4 shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <p className="text-xs uppercase tracking-[0.45em] text-white/50 mb-2">
                  Realtime QC
                </p>
                <p className="text-lg font-semibold">
                  Full Conductor Diagnostics
                </p>
                <p className="text-xs text-white/60">
                  Resistance | Insulation | Tension
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
