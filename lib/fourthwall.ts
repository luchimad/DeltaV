import type {
  FourthwallProduct,
  FourthwallProductsResponse,
  FourthwallCart,
  CartMutationPayload,
} from "./types";

// ─── Config ──────────────────────────────────────────────────────────────────

const API_BASE =
  process.env.NEXT_PUBLIC_FOURTHWALL_API ??
  "https://storefront-api.fourthwall.com/v1";

const STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_FOURTHWALL_TOKEN ??
  "";

const CHECKOUT_DOMAIN =
  process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN ?? "deltav-shop.fourthwall.com";

function withToken(url: string): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}storefront_token=${STOREFRONT_TOKEN}`;
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function getCollectionProducts(
  slug: string
): Promise<FourthwallProduct[]> {
  const res = await fetch(
    withToken(`${API_BASE}/collections/${slug}/products`),
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`Failed to fetch collection: ${slug}`);
  const data: FourthwallProductsResponse = await res.json();
  return data.results ?? [];
}

export async function getProduct(slug: string): Promise<FourthwallProduct> {
  const res = await fetch(withToken(`${API_BASE}/products/${slug}`), {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch product: ${slug}`);
  return res.json();
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export async function createCart(): Promise<FourthwallCart> {
  const res = await fetch(withToken(`${API_BASE}/carts`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [] }),
  });
  if (!res.ok) throw new Error("Failed to create cart");
  return res.json();
}

export async function getCart(cartId: string): Promise<FourthwallCart> {
  const res = await fetch(withToken(`${API_BASE}/carts/${cartId}`));
  if (!res.ok) throw new Error(`Failed to fetch cart: ${cartId}`);
  return res.json();
}

export async function addToCart(
  cartId: string,
  payload: CartMutationPayload
): Promise<FourthwallCart> {
  const res = await fetch(withToken(`${API_BASE}/carts/${cartId}/add`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

export async function removeFromCart(
  cartId: string,
  payload: CartMutationPayload
): Promise<FourthwallCart> {
  const res = await fetch(withToken(`${API_BASE}/carts/${cartId}/remove`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to remove from cart");
  return res.json();
}

// ─── Checkout ────────────────────────────────────────────────────────────────

export function getCheckoutUrl(cartId: string): string {
  return `https://${CHECKOUT_DOMAIN}/checkout?cartId=${cartId}`;
}
