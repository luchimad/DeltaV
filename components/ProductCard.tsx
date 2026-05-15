"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { FourthwallProduct } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface ProductCardProps {
  product: FourthwallProduct;
  className?: string;
  index?: number;
}

export default function ProductCard({ product, className = "", index = 0 }: ProductCardProps) {
  const price = product.variants?.[0]?.unitPrice?.value ?? 0;
  const currency = product.variants?.[0]?.unitPrice?.currency ?? "USD";
  const img = product.images?.[0]?.url ?? "";
  
  // 3D Parallax Tilt Setup
  const ref = useRef<HTMLDivElement>(null);
  
  // Track mouse position relative to the center of the card (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Map to glare position (percentages for background position)
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08) 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d",
          aspectRatio: "3/4"
        }}
        className={`glass-card group relative cursor-pointer ${className}`}
      >
        <Link href={`/product/${product.slug}`} className="absolute inset-0 z-0" />
        
        {/* Dynamic Glare Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-30 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glareBackground, transform: "translateZ(1px)" }}
        />
        
        {/* Image with 3D pop */}
        <div 
          className="card-img-wrap pointer-events-none transition-transform duration-300 group-hover:scale-105"
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          {img ? (
            <Image
              src={img}
              alt={product.name}
              width={400}
              height={500}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Info Footer with 3D pop */}
        <div 
          className="glass-info pointer-events-none mt-auto z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          <p className="text-[0.55rem] tracking-[0.2em] uppercase text-white/40 mb-1 font-mono">
            {formatPrice(price, currency)}
          </p>
          <div
            className="overflow-hidden whitespace-nowrap"
            style={{
              WebkitMaskImage: "linear-gradient(to right, #000 85%, transparent 100%)",
              maskImage: "linear-gradient(to right, #000 85%, transparent 100%)",
            }}
          >
            <h3 className="text-white text-sm tracking-tight font-syncopate uppercase auto-scroll-title pr-8">
              {product.name}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
