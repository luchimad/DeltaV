import Link from "next/link";
import type { Metadata } from "next";
import { getCollectionProducts } from "@/lib/fourthwall";
import type { FourthwallProduct } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${title} Collection — Delta V`,
    description: `Shop the ${title} collection from Delta V Aerospace.`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  let products: FourthwallProduct[] = [];
  try {
    products = await getCollectionProducts(slug);
  } catch (err) {
    console.error("Failed to fetch collection:", err);
  }

  return (
    <>
      {/* Header */}
      <div className="pt-20 pb-12 px-6 max-w-7xl mx-auto border-b border-white/10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-white/40 hover:text-white uppercase mb-8 transition-colors"
        >
          &larr; Return
        </Link>
        <p className="text-[0.7rem] tracking-[0.25em] uppercase text-white/50 mb-2 font-mono font-bold">
          Domain
        </p>
        <h1 className="text-4xl md:text-5xl text-white tracking-tight font-syncopate uppercase">
          {title} Collection
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-6 mt-10">
        {products.length === 0 ? (
          <div className="col-span-full py-32 text-center font-mono text-white/40 uppercase tracking-widest">
            No assets deployed in this sector.
          </div>
        ) : (
          products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        )}
      </div>
    </>
  );
}
