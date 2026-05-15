"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { FourthwallProduct } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: FourthwallProduct;
  className?: string;
  index?: number;
}

export default function ProductCard({ product, className = "", index = 0 }: ProductCardProps) {
  const price = product.variants?.[0]?.unitPrice?.value ?? 0;
  const currency = product.variants?.[0]?.unitPrice?.currency ?? "USD";
  const img = product.images?.[0]?.url ?? "";
  
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useCartStore((s) => s.showToast);
  const [adding, setAdding] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const variantId = product.variants?.[0]?.id;
    if (!variantId) return;

    setAdding(true);
    try {
      await addItem(variantId);
      showToast(`✓ VECTOR LOCKED — ${product.name} added`);
    } catch {
      showToast(`⨯ ERROR — Failed to add asset`);
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card group ${className}`}
      style={{ aspectRatio: "3/4" }}
    >
      <Link href={`/product/${product.slug}`} className="absolute inset-0 z-0" />
      
      {/* Image */}
      <div className="card-img-wrap pointer-events-none">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            width={400}
            height={500}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Quick Add Button */}
      <button
        onClick={handleQuickAdd}
        disabled={adding}
        className="absolute bottom-[4.5rem] right-4 w-12 h-12 bg-black/60 hover:bg-white/20 text-white/70 hover:text-white backdrop-blur-md border border-white/30 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 translate-y-4 group-hover:translate-y-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        aria-label="Quick add"
      >
        {adding ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        )}
      </button>

      {/* Info Footer */}
      <div className="glass-info pointer-events-none mt-auto z-10">
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
  );
}
