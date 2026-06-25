import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Waitlist", href: "#waitlist" },
  { name: "About", href: "/about" },
];

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith("#")) {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else if (href.startsWith("/#")) {
    e.preventDefault();
    const id = href.slice(2);
    if (window.location.pathname !== "/") {
      window.location.href = href;
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        background: scrolled ? "rgba(10,10,15,0.7)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
      className="fixed top-0 w-full z-50 transition-all duration-300 py-4"
    >
      <div className="flex justify-between items-center px-6 md:px-[24px] max-w-[1280px] mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 select-none">
          <img
            alt="Codestarix Logo"
            style={{ filter: "drop-shadow(0 0 8px rgba(157,111,255,0.4))" }}
            className="h-7 w-auto object-contain"
            src="/logo.png"
          />
          <span className="font-space font-bold tracking-wide text-[17px] text-[#F0EEF8]">
            Codestarix
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ transition: "color 0.2s ease" }}
              className="font-sans text-sm text-[#8B89A0] hover:text-[#F0EEF8]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#waitlist"
            onClick={(e) => handleNavClick(e, "#waitlist")}
            style={{
              background: "#7C3AED",
              borderRadius: "8px",
              padding: "10px 20px",
              transition: "background 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#6D28D9";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(124,58,237,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#7C3AED";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
            className="inline-flex items-center justify-center text-[#F0EEF8] font-mono text-xs tracking-widest font-semibold uppercase select-none"
          >
            Claim Spot
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#F0EEF8] p-2 focus:outline-none hover:bg-white/5 rounded-lg"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full overflow-hidden md:hidden"
            style={{
              background: "rgba(10,10,15,0.95)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex flex-col px-6 py-7 gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { handleNavClick(e, link.href); setIsOpen(false); }}
                  className="font-sans text-sm text-[#8B89A0] hover:text-[#F0EEF8] py-2 border-b border-white/[0.04] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={(e) => { handleNavClick(e, "#waitlist"); setIsOpen(false); }}
                style={{ background: "#7C3AED", borderRadius: "8px" }}
                className="w-full text-center py-3.5 text-[#F0EEF8] font-mono text-xs tracking-widest font-semibold uppercase mt-2"
              >
                Claim Spot
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
