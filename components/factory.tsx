"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Factory() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section
      id="factory"
      className="relative py-24 bg-[#040610] text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="container mx-auto px-4 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Our Factory & Production Capacity
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            State-of-the-art manufacturing excellence in the heart of Ethiopia
          </p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
            <Image
              src="/modern-cable-manufacturing-factory-interior-with-m.jpg"
              alt="Cable Manufacturing Facility"
              width={800}
              height={600}
              className="w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-bold mb-6">
              State-of-the-Art Manufacturing
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Addis Cable operates one of Ethiopia's most sophisticated cable
              manufacturing facilities, utilizing modern European and Asian
              technology for precision production.
            </p>
            <ul className="space-y-3">
              {[
                "Copper and aluminum rod breakdown",
                "Wire drawing",
                "Stranding and bunching",
                "Extrusion (PVC/XLPE)",
                "Armoring and sheathing",
                "Enamelling and chemical coating",
                "Real-time quality control and testing",
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <motion.svg
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                    className="w-6 h-6 text-primary flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                  <span className="text-white/70">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Production Stats - Added counter animation effect */}
        <div
          ref={statsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: "26", label: "Fully Equipped Production Lines" },
            { value: "13,836", label: "Tons Annual Capacity" },
            { value: "9,109", label: "Tons Copper Conductor" },
            { value: "4,727", label: "Tons Aluminum Conductor" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={statsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-primary/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={statsInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                }}
                className="text-4xl font-bold text-primary mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Unique Capability - Added pulse animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all"
        >
          <p className="text-lg text-white font-medium">
            Addis Cable is one of the only privately owned factory in Ethiopia
            capable of producing{" "}
            <motion.span
              animate={{
                textShadow: [
                  "0 0 0px rgba(184, 115, 51, 0)",
                  "0 0 20px rgba(184, 115, 51, 0.8)",
                  "0 0 0px rgba(184, 115, 51, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary font-bold"
            >
              enamelled winding wires
            </motion.span>{" "}
            for industrial motors, generators, and transformers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
