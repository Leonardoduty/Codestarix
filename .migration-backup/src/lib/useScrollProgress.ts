"use client";

import { useEffect, useState } from "react";

export interface XPProgressState {
  progress: number;
  level: number;
  label: string;
}

export function useScrollProgress(): XPProgressState {
  const [scrollState, setScrollState] = useState<XPProgressState>({
    progress: 0,
    level: 1,
    label: "LVL 1 — Curious Coder",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;

      if (totalScrollable <= 0) {
        setScrollState({ progress: 0, level: 1, label: "LVL 1 — Curious Coder" });
        return;
      }

      const percent = (scrollTop / totalScrollable) * 100;
      const progress = Math.min(100, Math.max(0, percent));

      let level = 1;
      let label = "LVL 1 — Curious Coder";

      if (progress >= 100) {
        level = 5;
        label = "LVL 5 — ⭐ STAR DEVELOPER";
      } else if (progress >= 75) {
        level = 4;
        label = "LVL 4 — Codestarix Ready";
      } else if (progress >= 50) {
        level = 3;
        label = "LVL 3 — Vibe Coder";
      } else if (progress >= 25) {
        level = 2;
        label = "LVL 2 — AI Explorer";
      }

      setScrollState({ progress, level, label });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to initialize state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollState;
}
