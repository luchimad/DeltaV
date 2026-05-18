"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const isHovering = useRef(false);
  const isVisible = useRef(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on devices with a fine pointer (desktop)
    if (window.matchMedia("(hover: none)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible.current && wrapperRef.current) {
        isVisible.current = true;
        wrapperRef.current.style.display = "block";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovering =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.classList.contains("cursor-pointer");

      if (hovering !== isHovering.current) {
        isHovering.current = hovering;
        if (circleRef.current) {
          circleRef.current.style.opacity = hovering ? "1" : "0";
          circleRef.current.style.transform = hovering ? "scale(1)" : "scale(0.5)";
        }
        if (svgRef.current) {
          svgRef.current.style.opacity = hovering ? "0" : "1";
          svgRef.current.style.transform = hovering ? "scale(0)" : "scale(1)";
        }
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={wrapperRef}
      className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
        display: "none",
      }}
    >
      {/* The Hover Circle (Centered on pointer) */}
      <div
        ref={circleRef}
        className="bg-white rounded-full absolute"
        style={{
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          opacity: 0,
          transform: "scale(0.5)",
          transition: "opacity 0.15s ease-out, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />

      {/* The Angled Triangle (Tip at pointer) */}
      <svg
        ref={svgRef}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transition: "opacity 0.15s ease-out, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
          transformOrigin: "top left",
        }}
      >
        <path
          d="M1 1L18 6.5L8.5 8.5L6.5 18L1 1Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
