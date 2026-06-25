
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  driftX: number;
  driftY: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let scrollY = 0;
    
    // Check reduced motion settings
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    canvas.width = width;
    canvas.height = height;

    // Track mouse drift offset
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Scale coordinates to center normalized (-1 to 1)
      targetMouseX = (e.clientX - width / 2) / (width / 2);
      targetMouseY = (e.clientY - height / 2) / (height / 2);
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // Set up 3 parallax layers of stars
    let starLayers: Star[][] = [[], [], []];
    const numStars = width < 768 ? 80 : 250;

    const initStars = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      starLayers = [[], [], []];
      for (let i = 0; i < numStars; i++) {
        const layer = Math.floor(Math.random() * 3); // 0, 1, or 2
        starLayers[layer].push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: (layer + 1) * 0.45 + Math.random() * 0.4, // Layer 0: small, Layer 2: larger
          alpha: (layer + 1) * 0.2 + Math.random() * 0.2, // Depth opacity scaling
          driftX: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.08,
          driftY: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.08,
        });
      }
    };

    initStars();

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse movements for cinematic lag/smoothness
      if (!prefersReducedMotion) {
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
      }

      starLayers.forEach((layerStars, layerIndex) => {
        // Higher layers scroll faster (closer to viewer)
        const parallaxFactor = (layerIndex + 1) * 0.12;
        const scrollOffset = scrollY * parallaxFactor;

        // Apply mouse drift offsets (scaled by layer depth)
        const mouseOffsetLinesX = mouseX * (layerIndex + 1) * 12;
        const mouseOffsetLinesY = mouseY * (layerIndex + 1) * 12;

        ctx.fillStyle = "#f8fafc"; // starlight-white

        layerStars.forEach((star) => {
          ctx.globalAlpha = star.alpha;
          ctx.beginPath();

          // Calculate drawing coordinates including parallax, mouse drift and cyclic wrapping
          let drawX = (star.x - mouseOffsetLinesX) % width;
          let drawY = (star.y - scrollOffset - mouseOffsetLinesY) % height;

          if (drawX < 0) drawX += width;
          if (drawY < 0) drawY += height;

          ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
          ctx.fill();

          // Apply subtle continuous drift animation if animation is not disabled
          if (!prefersReducedMotion) {
            star.x += star.driftX;
            star.y += star.driftY;

            // Wrap drift boundary
            if (star.x > width) star.x = 0;
            if (star.x < 0) star.x = width;
            if (star.y > height) star.y = 0;
            if (star.y < 0) star.y = height;
          }
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      initStars();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      style={{ backfaceVisibility: "hidden" }}
    />
  );
}
