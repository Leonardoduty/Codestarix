
import { useEffect, useState, useRef } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { motion, AnimatePresence } from "framer-motion";

interface XPParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  targetY: number;
  targetX: number;
}

export default function XPProgressBar() {
  const { progress, level, label } = useScrollProgress();
  const [prevLevel, setPrevLevel] = useState(1);
  const [particles, setParticles] = useState<XPParticle[]>([]);
  const [triggerGlow, setTriggerGlow] = useState(false);
  const particleIdRef = useRef(0);

  // Monitor level changes to fire level-up visuals
  useEffect(() => {
    if (level > prevLevel) {
      // Glow flash trigger
      setTimeout(() => setTriggerGlow(true), 0);
      const timer = setTimeout(() => setTriggerGlow(false), 800);

      // Generate a burst of 15-20 particles spreading from the bottom HUD
      const count = 18;
      const newParticles: XPParticle[] = [];
      
      for (let i = 0; i < count; i++) {
        // Distribute along the screen width randomly
        const xCoord = Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000);
        
        newParticles.push({
          id: particleIdRef.current++,
          x: xCoord,
          y: 0, // start right above the bar
          size: Math.random() * 5 + 3,
          color: Math.random() < 0.6 ? "#a78bfa" : "#4cd7f6", // lavender or cyan particles
          targetY: -140 - Math.random() * 100, // Shoot upwards
          targetX: (Math.random() - 0.5) * 80, // Drift horizontally
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Cleanup particles after animation
      const cleanTimer = setTimeout(() => {
        setParticles((prev) => prev.filter(p => !newParticles.includes(p)));
      }, 1500);

      setPrevLevel(level);

      return () => {
        clearTimeout(timer);
        clearTimeout(cleanTimer);
      };
    } else if (level < prevLevel) {
      // If user scrolls back up, silently reduce level without triggering celebratory animations
      setPrevLevel(level);
    }
    return undefined;
  }, [level, prevLevel]);

  return (
    <>
      {/* Particle Burst Overlay Emitter */}
      <div className="fixed bottom-9 left-0 w-full h-0 pointer-events-none z-50 overflow-visible">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 10px ${p.color}`,
              }}
              initial={{ opacity: 0.9, y: 0, scale: 1 }}
              animate={{
                opacity: 0,
                y: p.targetY,
                x: p.targetX,
                scale: 0.2,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Main HUD docked bottom progress bar */}
      <div
        className={`fixed bottom-0 left-0 w-full h-9 border-t z-50 flex items-center px-6 font-mono text-[10px] tracking-widest uppercase transition-all duration-500 select-none ${
          triggerGlow 
            ? "bg-[#7c3aed]/20 border-pulsar-lavender shadow-[0_-5px_25px_rgba(167,139,250,0.3)]" 
            : level === 5
            ? "bg-[#7c3aed]/10 border-pulsar-lavender/40"
            : "bg-[#0e0e13]/90 backdrop-blur-md border-glass-stroke"
        }`}
      >
        {/* Progress Background bar */}
        <div
          className="absolute top-0 left-0 h-full bg-pulsar-lavender/5 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />

        {/* 1px glowing neon border fill */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-pulsar-lavender to-nebula-purple transition-all duration-300 ease-out shadow-[0_0_8px_rgba(167,139,250,0.8)]"
          style={{ width: `${progress}%` }}
        />

        {/* HUD Text overlays */}
        <div className="relative z-10 flex justify-between w-full items-center text-on-surface-variant/80">
          <motion.span 
            className={`font-semibold flex items-center gap-1.5 ${level === 5 ? "text-primary animate-pulse" : "text-starlight-white"}`}
            animate={triggerGlow ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            {label}
          </motion.span>
          <span className="font-bold tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </>
  );
}

