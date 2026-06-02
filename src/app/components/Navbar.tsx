"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Waitlist", href: "#waitlist" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-glass-stroke py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-gutter max-w-container-max mx-auto">
        {/* Brand Logo Alignment */}
        <a href="#" className="flex items-center gap-2 select-none group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <img
              alt="Codestarix Rocket Logo"
              className="h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(167,139,250,0.6)] group-hover:scale-110 transition-transform duration-300"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2oufiQz1Qv8ivtxZFop78beXHjHbGRRXoc_D1RluK_g8fb-PT191Sa5Iz_HWyN9sao-MKHor36fT2Su6KwE4cuEaY5QlQvWiPkhYlvmqgCWgqscY7tT0AlSwNmqLdCRHHn3_Y2vGz0gcKdc9CAt7zq_CWM8xDqFq-Q70VKiblhHK_R557sU9P1gTfB67hPzFUqkS3ugc6rAMhajB4ufplCPry7_UHLvUcf2wG9Z-y4UeadKTQqmcfwH7g18n8WHLNr1ah_VMqIso"
            />
          </div>
          <span className="font-space font-bold tracking-wider text-lg md:text-xl text-starlight-white select-none">
            Codestarix
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10 font-mono text-xs tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-on-surface-variant hover:text-pulsar-lavender transition-colors duration-300 relative py-1 group"
            >
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-pulsar-lavender to-nebula-purple transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Action Button */}
        <div className="hidden md:block">
          <a
            href="#waitlist"
            className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-container to-nebula-purple text-starlight-white font-mono text-xs tracking-widest font-semibold hover:glow-effect transition-all duration-300 active:scale-95 select-none"
          >
            Claim Spot
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-starlight-white p-2 focus:outline-none hover:bg-white/5 rounded-lg active:scale-90 duration-200"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Slide Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0f]/95 backdrop-blur-2xl border-b border-glass-stroke md:hidden overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6 font-mono text-sm tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-on-surface-variant hover:text-pulsar-lavender transition-colors py-2 border-b border-white/[0.03]"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 rounded-xl bg-gradient-to-r from-primary-container to-nebula-purple text-starlight-white font-semibold text-xs tracking-widest uppercase hover:glow-effect transition-all mt-4"
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
