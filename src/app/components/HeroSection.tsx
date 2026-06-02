"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import RocketCanvas from "./RocketCanvas";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const headline = "Code smarter. Build faster. Break nothing.";
  const headlineWords = ["Code smarter.", "Build faster.", "Break nothing."];

  // Magnetic CTA mouse coordinates
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springSetting = { stiffness: 120, damping: 15, mass: 0.2 };
  const springX = useSpring(x, springSetting);
  const springY = useSpring(y, springSetting);

  // realistic typing simulator
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let typingDelay = 100;

    const tick = () => {
      const fullText = headlineWords[wordIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
        typingDelay = 40; // delete faster
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
        typingDelay = Math.random() * 60 + 50; // variable typing speed
      }

      setTypedText(currentText);

      // Determine transitions
      if (!isDeleting && currentText === fullText) {
        // Stop typing at end of word for a brief moment
        typingDelay = 1800;
        
        // If it's the last word, we stop typing altogether to let it sit!
        if (wordIndex === headlineWords.length - 1) {
          return; 
        }
        
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % headlineWords.length;
        typingDelay = 300; // delay before typing next word
      }

      setTimeout(tick, typingDelay);
    };

    const initialTimer = setTimeout(tick, 1000);
    return () => clearTimeout(initialTimer);
  }, []);

  // realistic cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 550);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    
    // Calculate distance from mouse pointer to button center
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - btnCenterX;
    const distanceY = e.clientY - btnCenterY;
    
    // Magnetic pull constraint (pull button up to 25px max)
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="home">
      {/* Central Nebula background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] rounded-full bg-nebula-purple/10 blur-[130px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-container-max mx-auto px-6 md:px-gutter flex flex-col md:flex-row items-center justify-between gap-12 py-12">
        {/* Left Side: Editorial Typography & Magnetic CTA */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start select-none">
          
          {/* Main dynamic typing header container */}
          <h1 className="font-space font-bold tracking-tight text-[38px] leading-[1.1] md:text-[62px] text-starlight-white mb-6 min-h-[120px] md:min-h-[210px] w-full max-w-[620px]">
            {typedText}
            <span
              className={`inline-block w-[3px] h-[35px] md:h-[55px] ml-1 bg-gradient-to-t from-pulsar-lavender to-primary transition-opacity ${
                cursorVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ verticalAlign: "middle" }}
            />
          </h1>

          {/* Subtext description fading in */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-sm md:text-base text-on-surface-variant max-w-lg mb-10 leading-relaxed"
          >
            Embark on a cinematic coding journey. Master the skills of tomorrow in a gamified universe designed for elite developers.
          </motion.p>

          {/* CTA containing premium magnetic springs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              ref={ctaRef}
              href="#waitlist"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x: springX, y: springY }}
              className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary-container to-nebula-purple text-starlight-white font-mono text-xs tracking-widest font-semibold hover:glow-effect hover:scale-105 active:scale-95 duration-200"
            >
              Claim Your Spot
              <ArrowRight size={14} className="animate-pulse" />
            </motion.a>
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
