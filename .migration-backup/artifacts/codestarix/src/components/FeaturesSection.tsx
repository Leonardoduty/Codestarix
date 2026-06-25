import React, { useRef, useState } from "react";
import { Gamepad2, Bot, Award, Store } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  isMuted?: boolean;
}

function FeatureCard({ icon, title, description, badge, isMuted }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const smoothX = useSpring(rotateX, spring);
  const smoothY = useSpring(rotateY, spring);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set(((y - rect.height / 2) / (rect.height / 2)) * -8);
    rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * 8);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); rotateX.set(0); rotateY.set(0); }}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformStyle: "preserve-3d",
        background: "#111118",
        borderRadius: "16px",
        border: hovered ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(255,255,255,0.06)",
        boxShadow: hovered ? "0 0 30px rgba(124,58,237,0.08)" : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "border 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        position: "relative",
        padding: "32px",
        cursor: "pointer",
      }}
    >
      {/* Coming Soon badge */}
      {badge && (
        <div style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "rgba(124,58,237,0.15)",
          border: "1px solid rgba(124,58,237,0.3)",
          color: "#9D6FFF",
          fontSize: "11px",
          fontFamily: "'JetBrains Mono', monospace",
          borderRadius: "20px",
          padding: "4px 10px",
          letterSpacing: "0.05em",
        }}>
          {badge}
        </div>
      )}

      <div style={{ transform: "translateZ(20px)" }}>
        {/* Icon box */}
        <div style={{
          background: "rgba(124,58,237,0.12)",
          borderRadius: "12px",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9D6FFF",
          marginBottom: "24px",
          opacity: isMuted ? 0.6 : 1,
        }}>
          {icon}
        </div>

        <h3 className="font-space font-semibold mb-3" style={{ fontSize: "22px", color: "#F0EEF8" }}>
          {title}
        </h3>
        <p className="font-sans text-sm leading-relaxed" style={{ color: "#8B89A0" }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: <Gamepad2 size={24} />,
      title: "Gamified Learning",
      description: "Learn coding through XP, levels, streaks, and badges. Every lesson feels like a game. Every skill unlocked feels like a win. You'll actually want to come back tomorrow.",
    },
    {
      icon: <Bot size={24} />,
      title: "AI-Era Coding Skills",
      description: "The world builds with AI now. We teach you how to use it properly — how to prompt correctly, spot the mistakes AI makes, and ship code that actually works instead of hoping it does.",
    },
    {
      icon: <Award size={24} />,
      title: "Coding Scholarship Test (CST)",
      description: "Prove your skills. Take the CST, earn a certificate, and win free access. It's the exam that rewards you for learning — and gives you something real to show for it.",
    },
    {
      icon: <Store size={24} />,
      title: "Knowledge Marketplace",
      description: "A marketplace where top developers sell their own courses within the Codestarix ecosystem. More perspectives. More depth. Launching Q1 2027.",
      badge: "Coming Soon",
      isMuted: true,
    },
  ];

  return (
    <section className="py-24 relative z-10" id="features">
      <div className="absolute -top-10 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "rgba(124,58,237,0.04)", filter: "blur(120px)" }} />

      <div className="max-w-[1280px] mx-auto px-6 md:px-[24px]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-space font-semibold mb-4"
            style={{ fontSize: "52px", color: "#F0EEF8" }}
          >
            What you'll master
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="font-sans"
            style={{ fontSize: "18px", color: "#8B89A0" }}
          >
            Real skills. Real projects. Built for the AI era.
          </motion.p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <FeatureCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
