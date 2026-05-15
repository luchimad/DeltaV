"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  size: number;
  speedY: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = canvas!.width = parent.clientWidth;
      height = canvas!.height = parent.clientHeight;
    }

    // Initialize dots
    resize();
    const dots: Dot[] = [];
    for (let i = 0; i < 200; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.4 + 0.08,
      });
    }
    dotsRef.current = dots;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";

      dotsRef.current.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();

        dot.y -= dot.speedY;
        if (dot.y < 0) {
          dot.y = height;
          dot.x = Math.random() * width;
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-hidden="true"
    />
  );
}
