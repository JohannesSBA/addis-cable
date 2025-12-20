"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const cardsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  const slideshowImages = [
    "/slide-optimized/3.jpg",
    "/slide-optimized/4.jpg",
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
    <div id="about">
      <section className="relative isolate overflow-hidden  min-h-[70vh] sm:min-h-[80vh] flex items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
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
          className="absolute inset-0 "
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
            {"About Addis Cable"}
          </h1>
          <p
            className="text-white/90 text-base sm:text-lg max-w-2xl leading-relaxed drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
            style={{ textShadow: "0 10px 28px rgba(0,0,0,0.5)" }}
          >
            {
              "Addis Cable is a leading manufacturer of high-performance copper and aluminum conductors engineered for Ethiopia's grids, industries, and communities."
            }
          </p>
        </div>
      </section>
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-x-0 top-0 h-40  pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative">
          {/* Story - Added fade-in animation */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Our Story: Building Ethiopia's Connected Future
            </h2>
            <div className="prose prose-lg max-w-none text-slate-600">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg leading-relaxed mb-4"
              >
                Founded under the umbrella of Chombe Seyoum Electrical Product
                Manufacturing (CSEPM), Addis Cable was built to reinforce
                Ethiopia's industrial base with reliable, locally produced
                electrical cables that meet the highest international standards.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg leading-relaxed mb-4"
              >
                Operating from the Gelan Industrial Zone, we leverage modern
                European and Asian technology in conductor drawing, extrusion,
                armoring, and testing to reduce Ethiopia's import dependency
                while creating skilled opportunities for local engineers and
                technicians.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg leading-relaxed"
              >
                Addis Cable embodies Ethiopia's drive toward industrialization,
                self-reliance, and export-ready quality, powering cities, rural
                networks, and industries essential to the nation's growth.
              </motion.p>
            </div>
          </motion.div>

          {/* Mission, Vision, Promise - Added card animations with 3D effect */}
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Our Mission",
                text: "To empower Ethiopia with high-quality, innovative, and affordable cable solutions that accelerate industrialization, electrification, and sustainable development.",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ),
                title: "Our Vision",
                text: `To become Ethiopia's most trusted and technologically advanced cable manufacturer, recognized for reliability, innovation, and excellence in powering national infrastructure.`,
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Our Promise",
                text: '"Wired for Excellence" reflects our commitment to craftsmanship, innovation, and integrity in every meter of cable we produce.',
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={cardsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  scale: 1.02,
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="bg-white/90 border border-orange-100 rounded-2xl p-8 shadow-xl hover:-translate-y-1 hover:border-primary/40 transition-all duration-300"
              >
                <motion.div
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
