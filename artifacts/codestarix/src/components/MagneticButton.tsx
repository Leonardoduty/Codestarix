
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactElement<any>;
}

export default function MagneticButton({ children }: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for button position (float towards cursor)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Motion values for counter parallax on inner contents (shift opposite)
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  // Spring settings for physical snapping and smooth return
  const springSettings = { stiffness: 120, damping: 15, mass: 0.2 };
  const smoothX = useSpring(x, springSettings);
  const smoothY = useSpring(y, springSettings);
  const smoothRx = useSpring(rx, springSettings);
  const smoothRy = useSpring(ry, springSettings);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate cursor offset from center of button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Check if cursor is within 80px radius of button center
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < 80) {
      // Pull toward cursor: deltaX * 0.25, deltaY * 0.25
      const pullX = deltaX * 0.25;
      const pullY = deltaY * 0.25;
      
      // Clamp to max 12px in any direction
      const clampX = Math.max(-12, Math.min(12, pullX));
      const clampY = Math.max(-12, Math.min(12, pullY));

      x.set(clampX);
      y.set(clampY);

      // Parallax counter-movement: -0.1x intensity
      rx.set(-clampX * 0.1);
      ry.set(-clampY * 0.1);
      
      setIsHovered(true);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rx.set(0);
    ry.set(0);
    setIsHovered(false);
  };

  if (isMobile) {
    return children;
  }

  const childClass = children.props.className || "";
  
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative p-8 -m-8 z-10"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
        className="relative rounded-full transition-all duration-300"
      >
        {/* Glow backlight element */}
        <div
          style={{
            boxShadow: isHovered ? "0 0 30px rgba(124, 58, 237, 0.6)" : "0 0 0px rgba(124, 58, 237, 0)",
            background: isHovered ? "rgba(124, 58, 237, 0.08)" : "transparent",
          }}
          className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none"
        />

        {React.cloneElement(children, {
          className: `${childClass} ${isHovered ? "brightness-[1.15]" : ""}`,
          style: {
            ...children.props.style,
          },
          children: (
            <motion.span
              style={{
                x: smoothRx,
                y: smoothRy,
                display: "inline-flex",
                alignItems: "center",
                gap: "inherit",
              }}
              className="w-full h-full justify-center items-center"
            >
              {children.props.children}
            </motion.span>
          ),
        })}
      </motion.div>
    </div>
  );
}
