"use client";

import { useState, useEffect } from "react";
import { useLenis } from "@/lib/useLenis";
import StarField from "@/app/components/StarField";
import IntroSequence from "@/app/components/IntroSequence";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import MarqueeTicker from "@/app/components/MarqueeTicker";
import RoadmapSection from "@/app/components/RoadmapSection";
import WaitlistSection from "@/app/components/WaitlistSection";
import XPProgressBar from "@/app/components/XPProgressBar";
import Footer from "@/app/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  // Initialize smooth scrolling
  useLenis();
  useEffect(() => {
    const seen = sessionStorage.getItem("csx_intro_seen");
    if (seen === "true") {
      setIntroFinished(true);
    }
  }, []);

  return (
    <>
      {/* Dynamic 3-Layer Canvas Starfield backdrop */}
      <StarField />

      {/* TIMED CINEMATIC INTRO OVERLAY */}
      <AnimatePresence>
        {!introFinished && (
          <IntroSequence onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      {/* CORE LANDING SHELL */}
      <AnimatePresence>
        {introFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-screen flex flex-col z-10 overflow-x-hidden selection:bg-pulsar-lavender/30"
          >
            {/* HUD Header Sticky Nav */}
            <Navbar />

            {/* Main scroll sections container */}
            <main className="flex-grow">
              <HeroSection />
              <FeaturesSection />
              <MarqueeTicker direction="left" />
              <RoadmapSection />
              <MarqueeTicker direction="right" />
              <WaitlistSection />
            </main>

            {/* Bottom XP Progression status HUD */}
            <XPProgressBar />

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
