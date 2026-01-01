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
    "/slide-optimized/5.jpg",
    "/slide-optimized/2.jpg",
    "/slide-optimized/6.jpg",
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

      <section className="relative bg-gradient-to-b from-white via-[#f7f7fb] to-white text-slate-900 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--accent)]/12 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="w-full flex-1 max-w-xl sm:max-w-2xl mx-auto lg:mx-0">
            <div className="rounded-[22px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-[0_20px_60px_rgba(15,23,42,0.12)] space-y-6 sm:space-y-7">
              <div className="space-y-5">
                <motion.h2
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-balance text-slate-900 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  {"Powering Ethiopia's future - wired for excellence"}
                </motion.h2>

                <motion.p
                  className="text-base sm:text-lg text-slate-600 max-w-3xl text-pretty leading-relaxed"
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
                    className="w-full rounded-2xl bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-[var(--accent)] text-white shadow-[0_20px_60px_rgba(15,23,42,0.2)] border border-[var(--accent)]/35 py-4 text-sm sm:text-base"
                  >
                    {"Contact a Sales Engineer"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-6 text-sm text-slate-600"
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
                    <div className="w-2 h-2 rounded-full bg-primary/90 animate-pulse" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="overflow-hidden rounded-full border border-slate-200 bg-white px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <motion.div
                  className="flex gap-8 text-[0.65rem] sm:text-xs tracking-[0.35em] uppercase text-slate-500 whitespace-nowrap"
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
                      <div className="w-1 h-1 rounded-full bg-slate-300/80" />
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
              className="relative rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 bg-gradient-to-br from-white via-[#f4f7fd] to-white shadow-[0_35px_110px_rgba(15,23,42,0.14)] border border-slate-200"
            >
              <div className="grid grid-cols-1 gap-6">
                {heroMetrics.map((metric) => (
                  <motion.div
                    key={metric.label}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4"
                    whileHover={{ y: -4, borderColor: "rgba(250,143,67,0.45)" }}
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                        {metric.label}
                      </p>
                      <p className="text-[14px]  text-accent">
                        {metric.detail}
                      </p>
                    </div>
                    <p className="text-xl font-semibold text-accent">
                      {metric.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
