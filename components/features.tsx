"use client";

import { Factory, Shield, Zap, Leaf, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Factory,
      title: "Unmatched Local Capacity",
      description:
        "One of Ethiopia's largest and most advanced cable factories, ensuring security of supply, faster delivery, and reduced import dependency.",
    },
    {
      icon: Shield,
      title: "International Standards",
      description:
        "Manufactured to IEC, ISO 9001, and ES 601 standards with rigorous in-house conductor resistance, tensile, and dielectric testing.",
    },
    {
      icon: Zap,
      title: "Complete Product Range",
      description:
        "Low-voltage building wires, MV/HV transmission cables, aerial bundled conductors, and specialty enamelled winding wires.",
    },

    {
      icon: Award,
      title: "Trusted National Partner",
      description:
        "Supplying EEU, Ethiopian Railways, real estate developers, government projects, and mission-critical infrastructure builds.",
    },
    {
      icon: Leaf,
      title: "Sustainable Manufacturing",
      description:
        "Recyclable materials, energy-efficient systems, and waste reduction aligned with Ethiopia's Green Economy Strategy and UN SDG 7.",
    },
  ];

  const layout = [
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-2",
    "lg:col-span-1",
  ];

  return (
    <section
      id="about"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#03040a] text-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_1200px_at_0%_0%,rgba(255,255,255,0.08),rgba(5,7,12,0.4))]" />
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-10 w-px bg-white/10" />
        <div className="absolute inset-y-0 right-10 w-px bg-white/5" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 space-y-6"
        >
          <p className="uppercase tracking-[0.4em] text-xs text-white/50">
            Why Choose Addis Cable
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            {"Engineered and built in Ethiopia for Ethiopia"}
          </h2>
          <p className="text-lg text-white/70 text-pretty leading-relaxed">
            {
              "Security of supply, local expertise, and end-to-end production depth that keep Ethiopia's electrification and construction projects moving."
            }
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                rotateY: 6,
                rotateX: 3,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className={`group p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-primary/50 transition-all duration-500 backdrop-blur-xl ${layout[index]}`}
            >
              <motion.div
                className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.4em] text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
