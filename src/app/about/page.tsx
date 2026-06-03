"use client";

import { useLenis } from "@/lib/useLenis";
import StarField from "@/app/components/StarField";
import Navbar from "@/app/components/Navbar";
import TeamSection from "@/app/components/TeamSection";
import Footer from "@/app/components/Footer";
import { motion } from "framer-motion";

export default function About() {
  // Initialize high-end Lenis smooth scrolling
  useLenis();

  return (
    <>
      {/* Dynamic 3-Layer Canvas Starfield backdrop */}
      <StarField />

      {/* CORE ABOUT SHELL */}
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
          <TeamSection />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </>
  );
}
