import { COMPANY_SOCIALS } from "@/config/socials";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "Roadmap", href: "/#roadmap" },
  { name: "Waitlist", href: "/#waitlist" },
  { name: "About", href: "/about" },
];

const XIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-[18px] h-[18px] stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: "#0A0A0F", borderTop: "1px solid rgba(255,255,255,0.06)" }} className="relative z-10">
      {/* Main footer row */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-[24px] py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Left — brand */}
          <div className="flex flex-col items-center md:items-start gap-2 select-none">
            <div className="flex items-center gap-2">
              <img
                alt="Codestarix"
                src="/logo.png"
                className="h-6 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 6px rgba(157,111,255,0.35))" }}
              />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", color: "#F0EEF8" }}>
                Codestarix
              </span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4A4860" }}>
              The coding platform for the AI era.
            </p>
          </div>

          {/* Center — nav */}
          <div className="flex items-center gap-7 flex-wrap justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4A4860", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8B89A0"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#4A4860"; }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right — socials */}
          <div className="flex items-center gap-5">
            {[
              { href: "https://x.com/codestarix", label: "X / Twitter", icon: <XIcon /> },
              { href: COMPANY_SOCIALS.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
              { href: COMPANY_SOCIALS.instagram, label: "Instagram", icon: <InstagramIcon /> },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{ color: "#4A4860", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#F0EEF8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#4A4860"; }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom copyright row */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }} className="py-4">
        <p className="text-center font-mono text-[12px]" style={{ color: "#4A4860" }}>
          © 2026 Codestarix. Built for the AI era.
        </p>
      </div>
    </footer>
  );
}
