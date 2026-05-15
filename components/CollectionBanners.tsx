import Link from "next/link";

interface CollectionBannerProps {
  href: string;
  title: string;
  bgImage: string;
  borderRight?: boolean;
}

function CollectionBanner({
  href,
  title,
  bgImage,
  borderRight = false,
}: CollectionBannerProps) {
  return (
    <Link
      href={href}
      className={`group relative aspect-square sm:aspect-[4/3] bg-neutral-900 ${
        borderRight ? "border-r" : ""
      } border-b border-white/10 overflow-hidden flex items-end p-8 md:p-16`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full flex justify-between items-end">
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-white/50 mb-2 uppercase">
            Domain
          </p>
          <h3 className="font-syncopate text-3xl md:text-4xl uppercase text-white">
            {title}
          </h3>
        </div>
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="-rotate-45"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function CollectionBanners() {
  return (
    <section className="border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <CollectionBanner
          href="/collection/aero"
          title="Aero"
          bgImage="/assets/f16-collection.png"
          borderRight
        />
        <CollectionBanner
          href="/collection/signature"
          title="Signature"
          bgImage="/assets/skyhawk-collection.png"
        />
      </div>
    </section>
  );
}
