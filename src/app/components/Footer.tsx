"use client";

import { Cpu } from "lucide-react";

export default function Footer() {
  const links = ["Documentation", "Privacy", "Terms", "Changelog"];

  return (
    <footer className="relative bg-[#0e0e13] border-t border-glass-stroke py-10 w-full z-10 overflow-hidden pb-20">
      {/* Top visual glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-pulsar-lavender/30 to-transparent" />

      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-gutter max-w-container-max mx-auto gap-8">
        {/* Brand trademark */}
        <div className="flex items-center gap-2 select-none">
          <img
            alt="Codestarix Logo"
            className="h-6 w-auto object-contain filter drop-shadow-[0_0_5px_rgba(167,139,250,0.5)]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2oufiQz1Qv8ivtxZFop78beXHjHbGRRXoc_D1RluK_g8fb-PT191Sa5Iz_HWyN9sao-MKHor36fT2Su6KwE4cuEaY5QlQvWiPkhYlvmqgCWgqscY7tT0AlSwNmqLdCRHHn3_Y2vGz0gcKdc9CAt7zq_CWM8xDqFq-Q70VKiblhHK_R557sU9P1gTfB67hPzFUqkS3ugc6rAMhajB4ufplCPry7_UHLvUcf2wG9Z-y4UeadKTQqmcfwH7g18n8WHLNr1ah_VMqIso"
          />
          <span className="font-space font-semibold text-sm tracking-widest text-starlight-white">
            CODESTARIX
          </span>
        </div>

        {/* Dynamic copyright statement */}
        <p className="font-mono text-[10px] tracking-widest text-on-surface-variant/60 uppercase text-center md:text-left">
          © {new Date().getFullYear()} CODESTARIX. NAVIGATING THE CODE-VERSE.
        </p>

        {/* Global metadata links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-widest uppercase">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-on-surface-variant/60 hover:text-primary transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
