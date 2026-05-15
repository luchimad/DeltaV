"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate on devices with a fine pointer (desktop)
    if (window.matchMedia("(hover: none)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      // The container will exactly follow the raw pointer coordinates
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {/* The Hover Circle (Centered on pointer) */}
      <motion.div
        className="bg-white rounded-full absolute"
        style={{ top: -16, left: -16, width: 32, height: 32 }}
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      {/* The Angled Triangle (Tip at pointer) */}
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="origin-top-left"
      >
        {/* Elongated angled triangle with rounded points */}
        <path 
          d="M1 1L18 6.5L8.5 8.5L6.5 18L1 1Z" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinejoin="round" 
        />
      </motion.svg>
    </motion.div>
  );
}
