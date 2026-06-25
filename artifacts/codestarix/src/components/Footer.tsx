
import { COMPANY_SOCIALS } from "@/config/socials";


export default function Footer() {
  return (
    <footer className="relative bg-[#0e0e13] border-t border-glass-stroke pt-5 pb-14 w-full z-10 overflow-hidden">
      {/* Top visual glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-pulsar-lavender/30 to-transparent" />

      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-gutter max-w-container-max mx-auto gap-6 md:gap-8">
        {/* Brand trademark */}
        <div className="flex items-center gap-2 select-none">
          <img
            alt="Codestarix Logo"
            className="h-6 w-auto object-contain filter drop-shadow-[0_0_5px_rgba(167,139,250,0.5)]"
            src="/logo.png"
          />
          <span className="font-space font-semibold text-sm tracking-widest text-starlight-white">
            CODESTARIX
          </span>
        </div>

        {/* Simplified copyright statement */}
        <p className="font-mono text-[10px] tracking-widest text-on-surface-variant/60 uppercase text-center">
          © 2026 Codestarix. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href={COMPANY_SOCIALS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Codestarix Instagram"
            className="text-on-surface-variant/60 hover:text-pulsar-lavender hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg className="w-[18px] h-[18px] stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href={COMPANY_SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Codestarix LinkedIn"
            className="text-on-surface-variant/60 hover:text-pulsar-lavender hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
