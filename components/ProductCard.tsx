import Link from "next/link";
import Image from "next/image";
import type { FourthwallProduct } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: FourthwallProduct;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const price = product.variants?.[0]?.unitPrice?.value ?? 0;
  const currency = product.variants?.[0]?.unitPrice?.currency ?? "USD";
  const img = product.images?.[0]?.url ?? "";

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`glass-card group ${className}`}
      style={{ aspectRatio: "3/4" }}
    >
      {/* Image */}
      <div className="card-img-wrap">
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

      {/* Info Footer */}
      <div className="glass-info">
        <p className="text-[0.55rem] tracking-[0.2em] uppercase text-white/40 mb-1 font-mono">
          {formatPrice(price, currency)}
        </p>
        <div
          className="overflow-hidden whitespace-nowrap"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, #000 85%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, #000 85%, transparent 100%)",
          }}
        >
          <h3 className="text-white text-sm tracking-tight font-syncopate uppercase auto-scroll-title pr-8">
            {product.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
