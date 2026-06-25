
import React, { useRef, useState } from "react";
import { Gamepad2, Bot, Award, Store } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  isMuted?: boolean;
}

function FeatureCard({ icon, title, description, badge, isMuted }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  
  // Motion values for tilt rotations
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Spring configurations for smooth physical rebound
  const springSettings = { stiffness: 150, damping: 18, mass: 0.4 };
  const smoothX = useSpring(rotateX, springSettings);
  const smoothY = useSpring(rotateY, springSettings);

  // Spotlight coordinates
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [showSpotlight, setShowSpotlight] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const xCoord = e.clientX - rect.left;
    const yCoord = e.clientY - rect.top;

    // Track position relative to card boundaries
    setSpotlightPos({ x: xCoord, y: yCoord });

    // Calculate rotation: center points map to 0deg rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation is 12 degrees
    const rX = ((yCoord - centerY) / centerY) * -12;
    const rY = ((xCoord - centerX) / centerX) * 12;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseEnter = () => {
    setShowSpotlight(true);
  };

  const handleMouseLeave = () => {
    setShowSpotlight(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformStyle: "preserve-3d",
      }}
      className="relative glass-panel rounded-2xl p-8 md:p-10 select-none overflow-hidden group cursor-pointer transition-all duration-300 active:scale-[0.98]"
    >
      {/* Specular spotlight glow layer */}
      {showSpotlight && (
        <div
          className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(167, 139, 250, 0.2) 0%, transparent 80%)`,
          }}
        />
      )}

      {/* Inner ambient light gradient */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent blur-[20px] pointer-events-none" />

      {/* Coming Soon Badge in Top Right */}
      {badge && (
        <div className="absolute top-6 right-6 px-2.5 py-0.5 rounded-full border border-pulsar-lavender/30 bg-pulsar-lavender/5 text-[10px] font-mono font-medium tracking-wide text-pulsar-lavender/80">
          {badge}
        </div>
      )}

      {/* Content wrapper with translateZ to pop forward in 3D space */}
      <div className="relative z-10 flex flex-col items-start" style={{ transform: "translateZ(35px)" }}>
        
        {/* Animated icon circle */}
        <div className={`p-4 rounded-xl bg-white/[0.02] border border-pulsar-lavender/10 text-pulsar-lavender group-hover:text-tertiary group-hover:border-tertiary/20 transition-colors duration-300 mb-6 ${isMuted ? "opacity-60" : ""}`}>
          {icon}
        </div>

        {/* Feature Title */}
        <h3 className="font-space font-semibold text-lg md:text-xl text-starlight-white mb-3 tracking-wide">
          {title}
        </h3>

        {/* Description text */}
        <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const list = [
    {
      icon: <Gamepad2 size={26} />,
      title: "Gamified Learning",
      description:
        "Learn coding through XP, levels, streaks, and badges. Every lesson feels like a game. Every skill unlocked feels like a win. You'll actually want to come back tomorrow.",
    },
    {
      icon: <Bot size={26} />,
      title: "AI-Era Coding Skills",
      description:
        "The world builds with AI now. We teach you how to use it properly — how to prompt correctly, spot the mistakes AI makes, and ship code that actually works instead of hoping it does.",
    },
    {
      icon: <Award size={26} />,
      title: "Coding Scholarship Test (CST)",
      description:
        "Prove your skills. Take the CST, earn a certificate, and win free access. It's the exam that rewards you for learning — and gives you something real to show for it.",
    },
    {
      icon: <Store size={26} />,
      title: "Knowledge Marketplace",
      description:
        "A marketplace where top developers sell their own courses within the Codestarix ecosystem. More perspectives. More depth. Launching Q1 2027.",
      badge: "Coming Soon",
      isMuted: true,
    },
  ];

  return (
    <section className="py-24 relative z-10" id="features">
      {/* Decorative background glow node */}
      <div className="absolute -top-10 left-1/3 w-96 h-96 rounded-full bg-tertiary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-container-max mx-auto px-6 md:px-gutter">
        
        {/* Section Header */}
        <div className="text-center mb-16 select-none">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space font-bold text-2xl md:text-4xl text-starlight-white mb-4"
          >
            What you'll master
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-xs md:text-sm text-on-surface-variant max-w-md mx-auto"
          >
            Real skills. Real projects. Built for the AI era.
          </motion.p>
        </div>

        {/* 3D tilt features grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {list.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <FeatureCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                badge={item.badge}
                isMuted={item.isMuted}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
