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

      <div className="relative z-10 w-full max-w-container-max mx-auto px-6 md:px-gutter flex flex-col md:flex-row items-center justify-between gap-12 py-12">
        {/* Left Side: Editorial Typography & Magnetic CTA */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start select-none">
          
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
