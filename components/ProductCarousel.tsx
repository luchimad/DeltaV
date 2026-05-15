"use client";

import { useRef } from "react";
import type { FourthwallProduct } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductCarouselProps {
  products: FourthwallProduct[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollBy(amount: number) {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="py-20 border-t border-white/10">
      <div className="max-w-[100vw] overflow-hidden">
        {/* Section Header */}
        <div className="px-6 md:px-12 mb-10 flex justify-between items-end">
          <div>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-white/40 mb-2 font-mono font-bold">
              Active Deployment
            </p>
            <h2 className="text-2xl md:text-3xl text-white tracking-tight font-syncopate uppercase">
              All Systems
            </h2>
          </div>
          <div className="hidden sm:flex gap-4">
            <button
              onClick={() => scrollBy(-350)}
              className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition text-white/50 hover:text-white"
              aria-label="Scroll left"
            >
              &larr;
            </button>
            <button
              onClick={() => scrollBy(350)}
              className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition text-white/50 hover:text-white"
              aria-label="Scroll right"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-4 px-6 md:px-12 overflow-x-auto hide-scroll snap-x snap-mandatory pb-8"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="flex-none w-[260px] sm:w-[300px] snap-center sm:snap-start"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
