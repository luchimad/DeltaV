"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { FourthwallProduct, FourthwallVariant, FourthwallImage } from "@/lib/types";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import ProductGallery from "@/components/ProductGallery";
import { ColorSwatches, SizeButtons } from "@/components/VariantSelector";
import SizeGuideModal from "@/components/SizeGuideModal";
import Spinner from "@/components/Spinner";

interface ProductDetailClientProps {
  product: FourthwallProduct;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // ── Parse variants into unique colors & sizes ──────────────────────────
  const { colors, sizes } = useMemo(() => {
    const colorMap: Record<string, string> = {};
    const sizeList: string[] = [];

    product.variants?.forEach((v) => {
      if (v.attributes.color) {
        colorMap[v.attributes.color.name] = v.attributes.color.swatch;
      }
      if (v.attributes.size && !sizeList.includes(v.attributes.size.name)) {
        sizeList.push(v.attributes.size.name);
      }
    });

    return { colors: colorMap, sizes: sizeList };
  }, [product.variants]);

  // ── Selection state ────────────────────────────────────────────────────
  const colorNames = Object.keys(colors);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    colorNames.length > 0 ? colorNames[0] : null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizes.length > 0 ? sizes[0] : null
  );
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addState, setAddState] = useState<"idle" | "loading" | "added" | "error">("idle");

  // ── Find matching variant ──────────────────────────────────────────────
  const selectedVariant: FourthwallVariant | undefined = useMemo(() => {
    let match = product.variants?.find((v) => {
      const matchColor = selectedColor
        ? v.attributes.color?.name === selectedColor
        : true;
      const matchSize = selectedSize
        ? v.attributes.size?.name === selectedSize
        : true;
      return matchColor && matchSize;
    });

    // Fallback: match color only
    if (!match && selectedColor) {
      match = product.variants?.find(
        (v) => v.attributes.color?.name === selectedColor
      );
    }

    return match ?? product.variants?.[0];
  }, [product.variants, selectedColor, selectedSize]);

  // ── Derived data ───────────────────────────────────────────────────────
  const price = selectedVariant?.unitPrice?.value ?? 0;
  const currency = selectedVariant?.unitPrice?.currency ?? "USD";
  const inStock =
    selectedVariant?.stock?.type !== "OUT_OF_STOCK";

  // Images: prefer variant images, fall back to product images
  const galleryImages: FourthwallImage[] = useMemo(() => {
    if (selectedVariant?.images && selectedVariant.images.length > 0) {
      return selectedVariant.images;
    }
    return product.images ?? [];
  }, [selectedVariant, product.images]);

  // ── Add to cart handler ────────────────────────────────────────────────
  const handleAddToCart = useCallback(async () => {
    if (!selectedVariant || !inStock) return;

    setAddState("loading");
    try {
      await addItem(selectedVariant.id);
      setAddState("added");
      setTimeout(() => {
        openCart();
        setAddState("idle");
      }, 900);
    } catch {
      setAddState("error");
      setTimeout(() => setAddState("idle"), 2000);
    }
  }, [selectedVariant, inStock, addItem, openCart]);

  // ── Button label ───────────────────────────────────────────────────────
  function renderButtonContent() {
    switch (addState) {
      case "loading":
        return <Spinner dark />;
      case "added":
        return "✓ Added";
      case "error":
        return "Error — Retry";
      default:
        return inStock ? "Add To Manifest" : "Out of Stock";
    }
  }

  return (
    <>
      <div className="max-w-7xl mx-auto border-b border-l border-r border-white/10 flex flex-col md:flex-row min-h-[70vh]">
        {/* Image Gallery */}
        <div className="w-full md:w-3/5 border-b md:border-b-0 border-white/10 aspect-square md:aspect-auto">
          <ProductGallery images={galleryImages} productName={product.name} />
        </div>

        {/* Details Panel */}
        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col">
          {/* Back Link — safe navigation, no external referrer risk */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-white/40 hover:text-white uppercase mb-8 transition-colors self-start"
          >
            &larr; Return
          </Link>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl text-white tracking-tight font-syncopate uppercase mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="font-mono text-xl text-white/80 mb-8 tracking-widest">
            {formatPrice(price, currency)}
          </div>

          {/* Description */}
          <div
            className="product-description mb-10"
            dangerouslySetInnerHTML={{ __html: product.description ?? "" }}
          />

          {/* Variants & Add to Cart */}
          <div className="mt-auto pt-8 border-t border-white/10">
            <ColorSwatches
              colors={colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
            <SizeButtons
              sizes={sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
              onSizeGuide={() => setSizeGuideOpen(true)}
            />

            <button
              onClick={handleAddToCart}
              disabled={!inStock || addState === "loading"}
              className="beams-cta w-full text-center flex justify-center items-center h-14 mt-6"
            >
              {renderButtonContent()}
            </button>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </>
  );
}
