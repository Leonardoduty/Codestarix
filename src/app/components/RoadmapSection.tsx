"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Orbit, Radio } from "lucide-react";

interface Milestone {
  icon: React.ReactNode;
  quarter: string;
  title: string;
  description: string;
  status: "completed" | "current" | "future";
}

export default function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Hook scroll offset calculations to container visibility bounds
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // progressive timeline scale bound to scroll (0 to 1)
  const drawScale = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);

  const milestones: Milestone[] = [
    {
      icon: <Compass size={22} />,
      quarter: "Q3 2024",
      title: "The Launchpad",
      description: "Private beta release for early waitlist adopters. Core gamified courses unlocked.",
      status: "completed",
    },
    {
      icon: <Orbit size={22} />,
      quarter: "Q4 2024",
      title: "Orbital Insertion",
      description: "Public launch. Integration of predictive AI debuggers and custom editor layouts.",
      status: "current",
    },
    {
      icon: <Radio size={22} />,
      quarter: "Q1 2025",
      title: "Deep Space Network",
      description: "Collaborative multiplayer coding lobbies. Live learning challenges in real-time.",
      status: "future",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-28 relative z-10 bg-[#0e0e13]/30 overflow-hidden"
      id="roadmap"
    >
      {/* Decorative nebula backdrop */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-[#7c3aed]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-container-max mx-auto px-6 md:px-gutter">
        {/* Section Header */}
        <div className="text-center mb-20 select-none">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space font-bold text-2xl md:text-4xl text-starlight-white mb-4"
          >
            The Flight Path
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-xs md:text-sm text-on-surface-variant max-w-sm mx-auto"
          >
            Our core coordinates for launching the future of education.
          </motion.p>
        </div>

        {/* DESKTOP TIMELINE SYSTEM */}
        <div className="hidden md:block relative w-full pt-10 pb-20">
          
          {/* Main timeline track background */}
          <div className="absolute top-[80px] left-0 right-0 h-[2px] bg-glass-stroke z-0">
            {/* Scroll-drawn progress line */}
            <motion.div
              style={{ scaleX: drawScale, originX: 0 }}
              className="h-full bg-gradient-to-r from-pulsar-lavender to-nebula-purple shadow-[0_0_10px_#a78bfa]"
            />
          </div>

          {/* Milestone Columns */}
          <div className="grid grid-cols-3 gap-10 relative z-10">
            {milestones.map((item, index) => {
              const isPast = item.status === "completed";
              const isCurrent = item.status === "current";

              return (
                <div key={item.quarter} className="flex flex-col items-center text-center">
                  
                  {/* Glowing orbital node connector */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 mb-8 select-none transition-all duration-500 ${
                      isPast
                        ? "bg-space-black border-pulsar-lavender text-pulsar-lavender shadow-[0_0_15px_rgba(167,139,250,0.4)]"
                        : isCurrent
                        ? "bg-gradient-to-tr from-primary-container to-nebula-purple border-pulsar-lavender text-starlight-white shadow-[0_0_20px_#7c3aed]"
                        : "bg-space-black border-glass-stroke text-on-surface-variant/40"
                    }`}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Milestone Card content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                    className={`glass-panel p-6 rounded-2xl border transition-all duration-500 w-full ${
                      isCurrent
                        ? "border-pulsar-lavender shadow-[inset_0_0_20px_rgba(167,139,250,0.08)] bg-white/[0.04]"
                        : "border-glass-stroke"
                    }`}
                  >
                    <span className={`font-mono text-[10px] tracking-widest font-semibold uppercase mb-2 block ${
                      isCurrent || isPast ? "text-pulsar-lavender" : "text-on-surface-variant/40"
                    }`}>
                      {item.quarter}
                    </span>
                    <h3 className="font-space font-semibold text-base text-starlight-white mb-2 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] md:text-xs text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE TIMELINE SYSTEM (VERTICAL FLOWS) */}
        <div className="md:hidden relative pl-8 select-none py-4">
          
          {/* Main vertical pipeline track */}
          <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-glass-stroke z-0">
            {/* Scroll-drawn progress line */}
            <motion.div
              style={{ scaleY: drawScale, originY: 0 }}
              className="w-full bg-gradient-to-b from-pulsar-lavender to-nebula-purple shadow-[0_0_8px_#a78bfa]"
            />
          </div>

          <div className="flex flex-col gap-12">
            {milestones.map((item, index) => {
              const isPast = item.status === "completed";
              const isCurrent = item.status === "current";

              return (
                <div key={item.quarter} className="relative flex flex-col items-start">
                  
                  {/* Glowing orbital node connector */}
                  <div
                    className={`absolute -left-[35px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 select-none transition-all duration-500 ${
                      isPast
                        ? "bg-space-black border-pulsar-lavender text-pulsar-lavender shadow-[0_0_10px_rgba(167,139,250,0.3)]"
                        : isCurrent
                        ? "bg-gradient-to-tr from-primary-container to-nebula-purple border-pulsar-lavender text-starlight-white shadow-[0_0_15px_#7c3aed]"
                        : "bg-space-black border-glass-stroke text-on-surface-variant/30"
                    }`}
                  >
                    <div className="scale-75">{item.icon}</div>
                  </div>

                  {/* Milestone Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className={`glass-panel p-5 rounded-2xl w-full border ${
                      isCurrent
                        ? "border-pulsar-lavender bg-white/[0.04]"
                        : "border-glass-stroke"
                    }`}
                  >
                    <span className={`font-mono text-[9px] tracking-widest font-semibold uppercase mb-1.5 block ${
                      isCurrent || isPast ? "text-pulsar-lavender" : "text-on-surface-variant/40"
                    }`}>
                      {item.quarter}
                    </span>
                    <h3 className="font-space font-semibold text-sm text-starlight-white mb-1.5 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
