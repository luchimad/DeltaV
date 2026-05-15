import type { Metadata } from "next";
import { getProduct } from "@/lib/fourthwall";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    return {
      title: `${product.name} — Delta V`,
      description:
        product.description?.replace(/<[^>]*>/g, "").slice(0, 160) ??
        "Delta V Aerospace Apparel",
      openGraph: {
        title: product.name,
        description:
          product.description?.replace(/<[^>]*>/g, "").slice(0, 160) ?? "",
        images: product.images?.[0]?.url
          ? [{ url: product.images[0].url }]
          : [],
      },
    };
  } catch {
    return { title: "Product — Delta V" };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let product = null;
  try {
    product = await getProduct(slug);
  } catch (err) {
    console.error("Failed to fetch product:", err);
  }

  if (!product) {
    return (
      <div className="text-center py-32 font-mono text-white/50">
        Asset not found.
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
