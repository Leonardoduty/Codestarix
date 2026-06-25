import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Orbit, Rocket, Globe } from "lucide-react";

type MilestoneStatus = "completed" | "current" | "future";

interface Milestone {
  icon: React.ReactNode;
  quarter: string;
  title: string;
  description: string;
  status: MilestoneStatus;
}

const STATUS_PILL: Record<MilestoneStatus, { label: string; style: React.CSSProperties }> = {
  completed: {
    label: "COMPLETED",
    style: {
      background: "rgba(34,197,94,0.1)",
      border: "1px solid rgba(34,197,94,0.25)",
      color: "#4ade80",
    },
  },
  current: {
    label: "IN PROGRESS",
    style: {
      background: "rgba(124,58,237,0.15)",
      border: "1px solid rgba(124,58,237,0.35)",
      color: "#9D6FFF",
    },
  },
  future: {
    label: "UPCOMING",
    style: {
      background: "rgba(74,72,96,0.2)",
      border: "1px solid rgba(74,72,96,0.4)",
      color: "#4A4860",
    },
  },
};

function StatusPill({ status }: { status: MilestoneStatus }) {
  const cfg = STATUS_PILL[status];
  return (
    <span style={{
      ...cfg.style,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "10px",
      borderRadius: "9999px",
      padding: "3px 10px",
      letterSpacing: "0.08em",
      display: "inline-block",
      marginBottom: "12px",
    }}>
      {cfg.label}
    </span>
  );
}

function MilestoneNode({ status }: { status: MilestoneStatus }) {
  const baseStyle: React.CSSProperties = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid",
    position: "relative",
    zIndex: 10,
    flexShrink: 0,
  };

  if (status === "completed") {
    return (
      <div style={{ ...baseStyle, borderColor: "#4A4860", background: "#1A1A24", color: "#4A4860" }}>
        <Compass size={20} />
      </div>
    );
  }
  if (status === "current") {
    return (
      <div style={{ ...baseStyle, borderColor: "#7C3AED", background: "rgba(124,58,237,0.15)", color: "#9D6FFF" }}>
        <Rocket size={20} />
        {/* Pulse ring */}
        <span className="animate-ping" style={{
          position: "absolute",
          inset: "-6px",
          borderRadius: "50%",
          border: "2px solid rgba(124,58,237,0.4)",
          pointerEvents: "none",
        }} />
      </div>
    );
  }
  return (
    <div style={{ ...baseStyle, borderColor: "rgba(255,255,255,0.08)", background: "#111118", color: "#4A4860" }}>
      <Globe size={20} />
    </div>
  );
}

export default function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const drawScale = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);

  const milestones: Milestone[] = [
    {
      icon: <Compass size={20} />,
      quarter: "Q3 2026",
      title: "The Launchpad",
      description: "Waitlist opens, first cohort onboards. Core gamified courses unlock for early adopters.",
      status: "current",
    },
    {
      icon: <Orbit size={20} />,
      quarter: "Q4 2026",
      title: "Orbital Insertion",
      description: "CST exam goes live. AI-powered debugger and custom editor layouts ship to all users.",
      status: "future",
    },
    {
      icon: <Rocket size={20} />,
      quarter: "Q2 2027",
      title: "Ignition",
      description: "Full public platform launch. Multiplayer coding lobbies, live challenges, and leaderboards go live.",
      status: "future",
    },
    {
      icon: <Globe size={20} />,
      quarter: "Q4 2027",
      title: "Deep Space",
      description: "Knowledge Marketplace opens, Ava AI coach goes live. The ecosystem expands beyond the platform.",
      status: "future",
    },
  ];

  return (
    <section ref={containerRef} className="py-28 relative z-10 overflow-hidden" id="roadmap"
      style={{ background: "rgba(14,14,19,0.4)" }}>
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "rgba(124,58,237,0.04)", filter: "blur(100px)" }} />

      <div className="max-w-[1280px] mx-auto px-6 md:px-[24px]">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-space font-bold mb-4"
            style={{ fontSize: "52px", color: "#F0EEF8" }}
          >
            The Flight Path
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="font-sans"
            style={{ color: "#8B89A0", fontSize: "16px" }}
          >
            Our core coordinates for launching the future of education.
          </motion.p>
        </div>

        {/* DESKTOP TIMELINE */}
        <div className="hidden md:block relative w-full pt-8 pb-16">
          {/* Timeline track */}
          <div className="absolute top-[72px] left-0 right-0 h-[2px] z-0"
            style={{ background: "linear-gradient(to right, rgba(124,58,237,0.1), #7C3AED, rgba(124,58,237,0.1))" }}>
            <motion.div
              style={{ scaleX: drawScale, originX: 0, height: "100%" }}
              className="bg-gradient-to-r from-[#9D6FFF] to-[#7C3AED] shadow-[0_0_10px_#7C3AED]"
            />
          </div>

          {/* Milestone columns */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {milestones.map((item, i) => (
              <div key={item.quarter} className="flex flex-col items-center text-center">
                {/* Node */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="mb-8"
                >
                  <MilestoneNode status={item.status} />
                </motion.div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.1 }}
                  style={{
                    background: "#111118",
                    border: item.status === "current" ? "1px solid rgba(124,58,237,0.35)" : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    padding: "20px",
                    width: "100%",
                    boxShadow: item.status === "current" ? "inset 0 0 20px rgba(124,58,237,0.06)" : "none",
                  }}
                >
                  <StatusPill status={item.status} />
                  <span className="block font-mono text-[10px] tracking-widest mb-2" style={{ color: "#9D6FFF" }}>
                    {item.quarter}
                  </span>
                  <h3 className="font-space font-semibold mb-2 text-left" style={{ fontSize: "15px", color: "#F0EEF8" }}>
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs leading-relaxed text-left" style={{ color: "#8B89A0" }}>
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE TIMELINE (vertical) */}
        <div className="md:hidden relative pl-10 py-4">
          <div className="absolute left-[18px] top-0 bottom-0 w-[2px] z-0"
            style={{ background: "linear-gradient(to bottom, rgba(124,58,237,0.1), #7C3AED 50%, rgba(124,58,237,0.1))" }}>
            <motion.div style={{ scaleY: drawScale, originY: 0, width: "100%", height: "100%" }}
              className="bg-gradient-to-b from-[#9D6FFF] to-[#7C3AED]" />
          </div>

          <div className="flex flex-col gap-10">
            {milestones.map((item, i) => (
              <div key={item.quarter} className="relative flex flex-col items-start">
                {/* Mobile node */}
                <div className="absolute -left-[42px] top-0 scale-75 origin-left">
                  <MilestoneNode status={item.status} />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: "#111118",
                    border: item.status === "current" ? "1px solid rgba(124,58,237,0.35)" : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    padding: "18px",
                    width: "100%",
                  }}
                >
                  <StatusPill status={item.status} />
                  <span className="block font-mono text-[9px] tracking-widest mb-1" style={{ color: "#9D6FFF" }}>
                    {item.quarter}
                  </span>
                  <h3 className="font-space font-semibold text-sm mb-1.5" style={{ color: "#F0EEF8" }}>
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs leading-relaxed" style={{ color: "#8B89A0" }}>
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
