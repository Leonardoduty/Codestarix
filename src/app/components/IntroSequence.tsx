"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [stage, setStage] = useState<"hidden" | "star-pulse" | "rocket-appear" | "rocket-launch" | "exit">("hidden");

  useEffect(() => {
    // Check if user has already seen the intro
    const isSeen = localStorage.getItem("csx_intro_seen");
    if (isSeen === "true") {
      onComplete();
      return;
    }

    // Begin sequence stages (Max duration 2.5s total)
    setStage("star-pulse");

    // Stage 2: Rocket materializes and particle burst happens at 1.0s
    const t2 = setTimeout(() => {
      setStage("rocket-appear");
    }, 1000);

    // Stage 3: Rocket launches upward at 1.8s
    const t3 = setTimeout(() => {
      setStage("rocket-launch");
    }, 1800);

    // Stage 4: Exit overlay and reveal hero at 2.4s
    const t4 = setTimeout(() => {
      setStage("exit");
      localStorage.setItem("csx_intro_seen", "true");
      onComplete();
    }, 2450);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    localStorage.setItem("csx_intro_seen", "true");
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-space-black z-[9999] flex items-center justify-center overflow-hidden">
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 font-mono text-xs text-on-surface-variant/60 hover:text-starlight-white transition-colors cursor-pointer tracking-widest uppercase border border-pulsar-lavender/10 px-4 py-2 rounded-full backdrop-blur-md z-50 hover:bg-white/5 active:scale-95 duration-200"
      >
        Skip Intro
      </button>

      <AnimatePresence mode="wait">
        {stage === "star-pulse" && (
          <motion.div
            key="star"
            className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_15px_#fff,0_0_30px_#fff]"
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{
              scale: [0.1, 1.8, 1, 1.8, 1],
              opacity: [0, 1, 0.6, 1, 0.8],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        )}

        {stage === "rocket-appear" && (
          <div className="relative flex items-center justify-center">
            {/* Particle shockwave ring */}
            <motion.div
              className="absolute w-24 h-24 rounded-full border-2 border-pulsar-lavender/40"
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />

            {/* Glowing core purple particles */}
            <motion.div
              className="absolute w-12 h-12 rounded-full bg-nebula-purple/30 blur-[20px]"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 2.2, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Materializing crystal rocket */}
            <motion.img
              alt="Rocket materializing"
              className="w-44 h-44 object-contain filter drop-shadow-[0_0_30px_rgba(167,139,250,0.8)]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3t4stkht05RXJXSvkItMm7cL020kZqE7eM6kz00zuuDgk58hTHATZWRY9PxSPtChyOqBmhIjNeCHKCA56ty0UUODVunODh-7Exn9_tM_3L2O_CtfaxSlTEuPSxQrfqaWkS51Hip-weMO-sr8EUaaReBG_IosGcPXfaqIUyChJs3AueSJW48e-TcJ56BdaCZvulaFoWSN78ruYCHKqPOIE_n4lhejZTJ9-norKIdBkoRXVDuUbICHXbMoq0O_Dw5XMBbeZ71SIPAg"
              initial={{ scale: 0.1, opacity: 0, y: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            />
          </div>
        )}

        {stage === "rocket-launch" && (
          <div className="relative flex items-center justify-center">
            {/* Supercharged exhaust trail glow */}
            <motion.div
              className="absolute w-28 h-56 bg-gradient-to-t from-nebula-purple/40 to-transparent blur-[30px] rounded-full"
              style={{ originY: 1 }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 2.2 }}
              transition={{ duration: 0.3 }}
            />

            {/* Accelerating Rocket Vertical blast */}
            <motion.img
              alt="Rocket blastoff"
              className="w-44 h-44 object-contain filter drop-shadow-[0_0_50px_rgba(167,139,250,1)]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3t4stkht05RXJXSvkItMm7cL020kZqE7eM6kz00zuuDgk58hTHATZWRY9PxSPtChyOqBmhIjNeCHKCA56ty0UUODVunODh-7Exn9_tM_3L2O_CtfaxSlTEuPSxQrfqaWkS51Hip-weMO-sr8EUaaReBG_IosGcPXfaqIUyChJs3AueSJW48e-TcJ56BdaCZvulaFoWSN78ruYCHKqPOIE_n4lhejZTJ9-norKIdBkoRXVDuUbICHXbMoq0O_Dw5XMBbeZ71SIPAg"
              initial={{ y: 0, scale: 1 }}
              animate={{ y: "-120vh", scale: 1.15 }}
              transition={{ duration: 0.65, ease: [0.6, -0.28, 0.735, 0.045] }}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
