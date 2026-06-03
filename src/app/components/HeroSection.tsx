"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RocketCanvas from "./RocketCanvas";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function HeroSection() {
  const [typedLines, setTypedLines] = useState<string[]>(["", "", ""]);
  const [currentLineActive, setCurrentLineActive] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const headlineWords = ["Code smarter.", "Build faster.", "Break nothing."];



  // realistic typing simulator
  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let lines = ["", "", ""];

    const tick = () => {
      if (currentLine >= headlineWords.length) {
        setIsDone(true);
        setCursorVisible(false);
        return;
      }

      const targetWord = headlineWords[currentLine];
      if (currentChar < targetWord.length) {
        lines[currentLine] = targetWord.substring(0, currentChar + 1);
        setTypedLines([...lines]);
        currentChar++;
        
        // variable typing speed
        const typingDelay = Math.random() * 60 + 50;
        setTimeout(tick, typingDelay);
      } else {
        // Line is complete. If it's the last line:
        if (currentLine === headlineWords.length - 1) {
          // Final blink delay (600ms) then set done
          setTimeout(() => {
            setIsDone(true);
            setCursorVisible(false);
          }, 600);
        } else {
          // Intermediate line: wait for 2 cursor blinks (~1200ms) before starting next line
          setTimeout(() => {
            currentLine++;
            currentChar = 0;
            setCurrentLineActive(currentLine);
            tick();
          }, 1200);
        }
      }
    };

    const initialTimer = setTimeout(tick, 1000);
    return () => clearTimeout(initialTimer);
  }, []);

  // realistic cursor blink
  useEffect(() => {
    if (isDone) return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 550);
    return () => clearInterval(interval);
  }, [isDone]);



  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="home">
      {/* Central Nebula background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] rounded-full bg-nebula-purple/10 blur-[130px] pointer-events-none z-0" />

      {/* Aurora Glow Blobs Behind Hero */}
      {/* Blob 1 — Left side */}
      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          left: "-5%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 0,
        }}
        className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        animate={{
          x: [-20, 0],
          y: [30, 0],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Blob 2 — Right side */}
      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(109, 40, 217, 0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 0,
        }}
        className="w-[360px] h-[240px] md:w-[600px] md:h-[400px]"
        animate={{
          x: [20, 0],
          y: [-25, 0],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Blob 3 — Bottom centre */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "0%",
          left: "30%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 0,
        }}
        className="w-[240px] h-[180px] md:w-[400px] md:h-[300px]"
        animate={{
          x: [15, 0],
          y: [20, 0],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="relative z-10 w-full max-w-container-max mx-auto px-6 md:px-gutter flex flex-col md:flex-row items-center justify-between gap-12 py-12">
        {/* Left Side: Editorial Typography & Magnetic CTA */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start select-none">
          
          {/* Pill Announcement Label */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden inline-flex items-center justify-center rounded-full px-[18px] py-[6px] bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.4)] text-[11px] font-semibold tracking-[0.2em] text-[rgba(167,139,250,0.9)] uppercase select-none transition-all duration-200 hover:border-[rgba(124,58,237,0.8)] hover:bg-[rgba(124,58,237,0.25)] mb-6 cursor-default"
          >
            <span className="relative z-10">✦ THE CODING PLATFORM FOR THE AI ERA ✦</span>
            {/* Shimmer sweep effect */}
            <motion.div
              className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-20 pointer-events-none"
              animate={{
                left: ["-100%", "200%"],
              }}
              transition={{
                repeat: Infinity,
                repeatDelay: 4,
                duration: 1.2,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Main dynamic typing header container */}
          <h1 className="font-space font-bold tracking-tight text-[38px] leading-[1.1] md:text-[62px] text-starlight-white mb-6 min-h-[120px] md:min-h-[210px] w-full max-w-[620px]">
            {headlineWords.map((word, index) => {
              if (index > currentLineActive && typedLines[index] === "") {
                return null;
              }
              return (
                <span key={index} className="block">
                  {typedLines[index]}
                  {!isDone && index === currentLineActive && (
                    <span
                      className={`inline-block w-[3px] h-[30px] md:h-[50px] ml-1.5 bg-gradient-to-t from-pulsar-lavender to-primary transition-opacity ${
                        cursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ verticalAlign: "middle" }}
                    />
                  )}
                </span>
              );
            })}
          </h1>

          {/* Subtext description fading in */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-sans text-sm md:text-base text-on-surface-variant max-w-lg mb-10 leading-relaxed"
          >
            Embark on a cinematic coding journey. Master the skills of tomorrow in a gamified universe designed for elite developers.
          </motion.p>

          {/* CTA containing premium magnetic springs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <MagneticButton>
              <a
                href="#waitlist"
                className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary-container to-nebula-purple text-starlight-white font-mono text-xs tracking-widest font-semibold hover:glow-effect hover:scale-105 active:scale-95 duration-200"
              >
                Claim Your Spot
                <ArrowRight size={14} className="animate-pulse" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Side: Floating Crystal Rocket Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 w-full flex justify-center items-center"
        >
          <RocketCanvas />
        </motion.div>
      </div>
    </section>
  );
}
