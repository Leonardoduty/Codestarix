"use client";

import React from "react";

interface MarqueeTickerProps {
  direction: "left" | "right";
}

const items = [
  "XP SYSTEM",
  "VIBE CODING",
  "AI SKILLS",
  "CST EXAM",
  "OCTOBER 2026",
  "LIMITED SPOTS",
  "GAMIFIED LEARNING",
  "BUILD WITH AI",
  "EARN CERTIFICATES",
  "CODE SMARTER",
];

export default function MarqueeTicker({ direction }: MarqueeTickerProps) {
  // Renders a single run of the 10 phrases
  const renderSequence = (keyPrefix: string) => (
    <span className="inline-flex items-center">
      {items.map((item, idx) => (
        <span key={`${keyPrefix}-${idx}`} className="inline-flex items-center">
          <span className="mx-6 font-mono text-[13px] font-semibold tracking-[0.15em] text-[#a78bfa]/90 select-none uppercase">
            {item}
          </span>
          <span className="text-[#a78bfa] font-extrabold text-[15px] select-none">·</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="w-full relative z-10 select-none marquee-wrapper">
      {/* Self-contained CSS marquee animations */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee-right 25s linear infinite;
        }
        .marquee-wrapper:hover .animate-marquee-left,
        .marquee-wrapper:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Marquee horizontal strip container */}
      <div
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
        className="w-full h-[44px] flex items-center overflow-hidden bg-[#7c3aed]/[0.12] border-y border-[#7c3aed]/25"
      >
        <div className={direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}>
          {renderSequence("seq1")}
          {renderSequence("seq2")}
          {renderSequence("seq3")}
          {renderSequence("seq4")}
        </div>
      </div>
    </div>
  );
}
