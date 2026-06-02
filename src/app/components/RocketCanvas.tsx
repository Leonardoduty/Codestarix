"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function RocketCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rocketImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 500;
    let height = 500;
    
    // Fit canvas resolution to parent
    const resizeCanvas = () => {
      if (containerRef.current) {
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    let particles: Particle[] = [];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion && rocketImgRef.current) {
        const rect = rocketImgRef.current.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();

        if (containerRect) {
          // Track the base of the rocket relative to container
          const rocketBaseX = rect.left - containerRect.left + rect.width / 2;
          const rocketBaseY = rect.top - containerRect.top + rect.height * 0.85;

          // Emit particles from exhaust path (thrusters)
          if (Math.random() < 0.6) {
            particles.push({
              x: rocketBaseX + (Math.random() * 16 - 8),
              y: rocketBaseY,
              // Vector speeds - spraying downward and slightly sideways
              vx: (Math.random() - 0.5) * 1.5,
              vy: Math.random() * 3 + 2,
              radius: Math.random() * 3 + 2,
              color: Math.random() < 0.7 ? "167, 139, 250" : "124, 58, 237", // pulsar-lavender or nebula-purple
              alpha: 0.8,
              life: 0,
              maxLife: Math.random() * 30 + 20,
            });
          }

          // Random comet trail particle coming in from top right drifting down-left
          if (Math.random() < 0.05) {
            particles.push({
              x: Math.random() * width + width * 0.2,
              y: 0,
              vx: -Math.random() * 4 - 2,
              vy: Math.random() * 3 + 3,
              radius: Math.random() * 2 + 1,
              color: "76, 215, 246", // cyan tertiary color
              alpha: 0.9,
              life: 0,
              maxLife: 80,
            });
          }
        }
      }

      // Draw and update particles
      particles = particles.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        
        // Decay opacity near end of life
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.radius * (1 - p.life / p.maxLife)), 0, Math.PI * 2);
        ctx.fill();

        return p.life < p.maxLife;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[520px] aspect-square flex justify-center items-center"
    >
      {/* 60fps exhaust particle canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Pulsing Backlight engine glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-primary-container/10 blur-[80px] z-0 animate-[pulse_2s_infinite_alternate]" />

      {/* Rocket orbiting visual frame with infinite floating loops */}
      <motion.div
        className="relative z-10 w-4/5 h-4/5 flex justify-center items-center"
        animate={{
          y: [0, -18, 12, 0],
          x: [0, 8, -6, 0],
          rotate: [0, 1, -1.5, 0],
        }}
        transition={{
          duration: 9,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <img
          ref={rocketImgRef}
          alt="Codestarix Crystal Rocket"
          className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(167,139,250,0.55)] rocket-halo select-none pointer-events-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3t4stkht05RXJXSvkItMm7cL020kZqE7eM6kz00zuuDgk58hTHATZWRY9PxSPtChyOqBmhIjNeCHKCA56ty0UUODVunODh-7Exn9_tM_3L2O_CtfaxSlTEuPSxQrfqaWkS51Hip-weMO-sr8EUaaReBG_IosGcPXfaqIUyChJs3AueSJW48e-TcJ56BdaCZvulaFoWSN78ruYCHKqPOIE_n4lhejZTJ9-norKIdBkoRXVDuUbICHXbMoq0O_Dw5XMBbeZ71SIPAg"
        />
      </motion.div>
    </div>
  );
}
