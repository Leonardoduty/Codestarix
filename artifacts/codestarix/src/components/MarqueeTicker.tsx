interface MarqueeTickerProps {
  direction: "left" | "right";
}

const items = [
  "CODING SCHOLARSHIP TEST",
  "OCT 2026",
  "LIMITED SPOTS",
  "AI-NATIVE CURRICULUM",
  "EARN WHILE YOU LEARN",
  "VIBE CODING",
  "JOIN THE WAITLIST",
  "REAL PROJECTS",
  "XP SYSTEM",
  "GAMIFIED LEARNING",
];

export default function MarqueeTicker({ direction }: MarqueeTickerProps) {
  const renderSequence = (key: string) => (
    <span className="inline-flex items-center">
      {items.map((item, idx) => (
        <span key={`${key}-${idx}`} className="inline-flex items-center">
          <span style={{
            marginLeft: "28px",
            marginRight: "28px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            color: "#8B89A0",
            textTransform: "uppercase",
            userSelect: "none",
          }}>
            {item}
          </span>
          <span style={{ color: "#7C3AED", fontWeight: 800, fontSize: "15px", userSelect: "none" }}>·</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="w-full relative z-10 select-none marquee-outer">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-ml {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee-left 35s linear infinite;
        }
        .animate-mr {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee-right 35s linear infinite;
        }
        .marquee-outer:hover .animate-ml,
        .marquee-outer:hover .animate-mr {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          background: "rgba(124,58,237,0.08)",
          borderTop: "1px solid rgba(124,58,237,0.2)",
          borderBottom: "1px solid rgba(124,58,237,0.2)",
        }}
        className="w-full h-[42px] flex items-center overflow-hidden"
      >
        <div className={direction === "left" ? "animate-ml" : "animate-mr"}>
          {renderSequence("a")}
          {renderSequence("b")}
          {renderSequence("c")}
          {renderSequence("d")}
        </div>
      </div>
    </div>
  );
}
