"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const cardsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-white via-[#fff9f4] to-white text-slate-900 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#ffe5cf]/60 to-transparent pointer-events-none" />
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
              armoring, and testing to reduce Ethiopia's import dependency while
              creating skilled opportunities for local engineers and
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
  );
}
