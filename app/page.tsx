import Image from "next/image";
import { getCollectionProducts } from "@/lib/fourthwall";
import type { FourthwallProduct } from "@/lib/types";
import ProductCarousel from "@/components/ProductCarousel";
import CollectionBanners from "@/components/CollectionBanners";
import HeroCanvas from "@/components/HeroCanvas";

export default async function HomePage() {
  let products: FourthwallProduct[] = [];
  try {
    products = await getCollectionProducts("all");
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  return (
    <>
      {/* ─── Hero Section ──────────────────────────────────────────────── */}
      <div className="relative h-[85vh] w-full overflow-hidden bg-black flex flex-col justify-center items-center">
        {/* Particle Canvas */}
        <div className="absolute inset-0 z-0 opacity-60">
          <HeroCanvas />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

        {/* Content */}
        <div className="z-10 flex flex-col items-center gap-12 w-full max-w-7xl px-6">
          <Image
            src="/assets/logo-text-white.png"
            alt="Delta V Logo"
            width={672}
            height={200}
            className="w-full max-w-2xl opacity-90 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            priority
          />

          {/* Bottom-left metadata (desktop only) */}
          <div className="absolute bottom-12 left-6 sm:left-12 font-mono text-[0.65rem] tracking-[0.1em] text-white/50 leading-loose uppercase hidden sm:block">
            <div>[ EST. 2024 ]</div>
            <div>AEROSPACE APPAREL</div>
            <div className="text-white mt-1">DEFINE YOUR VECTOR</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 w-px h-[60px] z-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
            animation: "beamsFlow 2s infinite ease-in-out",
          }}
        />
      </div>

      {/* ─── Product Carousel ──────────────────────────────────────────── */}
      {products.length > 0 && <ProductCarousel products={products} />}

      {/* ─── Collection Banners ────────────────────────────────────────── */}
      <CollectionBanners />
    </>
  );
}
