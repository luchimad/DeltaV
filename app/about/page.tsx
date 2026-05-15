import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Delta V",
  description:
    "Aviation isn't just a hobby; it's a perspective. Delta V was born from an obsession with flight.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 border-b border-white/10 relative overflow-hidden min-h-[70vh] flex flex-col justify-center">
      {/* Background Watermark */}
      <Image
        src="/assets/logo-notext-white.png"
        alt=""
        width={800}
        height={800}
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[800px] opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl">
        <p className="text-[0.7rem] tracking-[0.25em] uppercase text-white/40 mb-6 font-mono font-bold">
          About Us
        </p>
        <h1 className="text-4xl md:text-6xl text-white tracking-tighter font-syncopate uppercase mb-10 leading-none">
          Define Your Vector.
        </h1>

        <div className="text-white/60 leading-relaxed space-y-6 text-lg">
          <p>Aviation isn&apos;t just a hobby; it&apos;s a perspective.</p>
          <p>
            Delta V was born from an obsession with the sleek lines, the raw
            power, and the timeless legacy of flight. We noticed a gap in the
            market: most aviation apparel was either too cheesy or lacked the
            quality that pilots and enthusiasts actually wanted to wear. We
            decided to change that.
          </p>
          <p>
            Our name, Δv, represents a change in velocity. In physics, it&apos;s
            the impulse required to move from one state to another. For us, it
            represents the drive to move aviation style forward—stripping away
            the clutter to deliver clean, minimalist, and high-quality gear.
          </p>
          <p>Designed for the hangar. Built for the street.</p>
          <p>
            We don&apos;t do fast fashion. Our pieces are designed for those who
            appreciate the subtle details of a classic airframe or the technical
            beauty of a modern jet. We bridge the gap between aviation history
            and modern streetwear, creating garments that look as good on the
            ramp as they do in the city.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-10">
          <div>
            <h3 className="font-syncopate text-white uppercase text-sm mb-3">
              Premium Textiles
            </h3>
            <p className="text-xs text-white/50">
              We use premium, high-density fabrics that provide a structured fit
              and long-term durability.
            </p>
          </div>
          <div>
            <h3 className="font-syncopate text-white uppercase text-sm mb-3">
              Detailed Artistry
            </h3>
            <p className="text-xs text-white/50">
              Every graphic is custom-built from the ground up, inspired by
              original blueprints, telemetry data, and iconic aircraft
              silhouettes.
            </p>
          </div>
          <div>
            <h3 className="font-syncopate text-white uppercase text-sm mb-3">
              Purposeful Design
            </h3>
            <p className="text-xs text-white/50">
              No unnecessary bulk. Just refined essentials for those who live
              life at a different altitude.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
