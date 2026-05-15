"use client";

import { useRef } from "react";
import Image from "next/image";
import type { FourthwallImage } from "@/lib/types";

interface ProductGalleryProps {
  images: FourthwallImage[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollGallery(direction: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.offsetWidth * direction, behavior: "smooth" });
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-white/20 font-mono text-sm">
        No Images Available
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group">
      {/* Scrollable Track */}
      <div
        ref={scrollRef}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scroll"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-full h-full flex items-center justify-center p-8 bg-neutral-900"
          >
            <Image
              src={img.url}
              alt={`${productName} - Image ${i + 1}`}
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain opacity-95 drop-shadow-2xl product-img"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => scrollGallery(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-10"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            >
              <path d="M14 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scrollGallery(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-10"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            >
              <path d="M10 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
