import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RocketCanvas from "./RocketCanvas";
import { ArrowRight } from "lucide-react";

const AVATAR_COLORS = ["#7C3AED", "#9D6FFF", "#6D28D9", "#4F319C"];
const AVATAR_INITIALS = ["A", "S", "R", "K"];

export default function HeroSection() {
  const [typedLines, setTypedLines] = useState<string[]>(["", "", ""]);
  const [currentLineActive, setCurrentLineActive] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const headlineWords = ["Code smarter.", "Build faster.", "Break nothing."];

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
        const delay = Math.random() * 60 + 50;
        setTimeout(tick, delay);
      } else {
        if (currentLine === headlineWords.length - 1) {
          setTimeout(() => { setIsDone(true); setCursorVisible(false); }, 600);
        } else {
          setTimeout(() => { currentLine++; currentChar = 0; setCurrentLineActive(currentLine); tick(); }, 1200);
        }
      }
    };
    const t = setTimeout(tick, 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isDone) return;
    const interval = setInterval(() => setCursorVisible((v) => !v), 550);
    return () => clearInterval(interval);
  }, [isDone]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[24px] flex flex-col md:flex-row items-center justify-between gap-10 py-16">

        {/* LEFT — text column, 55% */}
        <div className="flex-[0_0_55%] flex flex-col items-start select-none">

          {/* Badge with pulse dot */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-7"
            style={{
              border: "1px solid rgba(124,58,237,0.4)",
              background: "rgba(124,58,237,0.1)",
              borderRadius: "9999px",
              padding: "5px 14px",
            }}
          >
            {/* Animated pulse dot */}
            <span className="relative flex h-[6px] w-[6px]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "#7C3AED" }} />
              <span className="relative inline-flex rounded-full h-[6px] w-[6px]"
                style={{ background: "#7C3AED" }} />
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#9D6FFF", letterSpacing: "0.2em" }}
              className="uppercase font-medium">
              THE CODING PLATFORM FOR THE AI ERA
            </span>
          </motion.div>

          {/* Headline with typing effect — "nothing" in purple */}
          <h1 className="font-space font-bold leading-[1.05] text-[44px] md:text-[72px] text-[#F0EEF8] mb-6 min-h-[140px] md:min-h-[230px] w-full max-w-[620px]">
            {headlineWords.map((word, index) => {
              if (index > currentLineActive && typedLines[index] === "") return null;
              const isLast = index === 2;
              const typed = typedLines[index];
              return (
                <span key={index} className="block">
                  {isLast && isDone ? (
                    <>
                      <span>Break </span>
                      <span style={{ color: "#7C3AED" }}>nothing.</span>
                    </>
                  ) : (
                    <>
                      {typed}
                      {!isDone && index === currentLineActive && (
                        <span
                          className={`inline-block w-[3px] h-[34px] md:h-[56px] ml-1.5 transition-opacity`}
                          style={{ background: "linear-gradient(to top, #a78bfa, #d2bbff)", verticalAlign: "middle", opacity: cursorVisible ? 1 : 0 }}
                        />
                      )}
                    </>
                  )}
                </span>
              );
            })}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-base leading-relaxed mb-9"
            style={{ color: "#8B89A0", maxWidth: "480px" }}
          >
            Learn to code with AI, not despite it. Real projects, real skills, real XP — in a world that actually makes you want to come back.
          </motion.p>

          {/* Two CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-7 flex-wrap"
          >
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest font-semibold uppercase text-[#F0EEF8] transition-all duration-200"
              style={{ background: "#7C3AED", borderRadius: "8px", padding: "12px 28px" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#6D28D9";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#7C3AED";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              Claim Your Spot
              <ArrowRight size={13} />
            </a>
            <a
              href="#roadmap"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "12px 24px", color: "#8B89A0" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(124,58,237,0.4)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#F0EEF8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#8B89A0";
              }}
            >
              See the roadmap
              <span style={{ color: "#7C3AED" }}>→</span>
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {/* Overlapping avatars */}
            <div className="flex -space-x-2">
              {AVATAR_COLORS.map((color, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0A0A0F] flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: color, zIndex: AVATAR_COLORS.length - i }}>
                  {AVATAR_INITIALS[i]}
                </div>
              ))}
            </div>
            <span className="font-sans text-[13px]" style={{ color: "#4A4860" }}>
              · 500+ developers on the waitlist
            </span>
          </motion.div>
        </div>

        {/* RIGHT — crystal illustration, 45% */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-[0_0_45%] w-full flex justify-center items-center relative"
        >
          {/* Radial glow behind crystal */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)", borderRadius: "50%" }} />
          <div className="w-full max-w-[480px]">
            <RocketCanvas />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
