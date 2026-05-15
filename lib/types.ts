// ─── Fourthwall Storefront API Types ─────────────────────────────────────────
// Derived from actual API responses at:
// https://storefront-api.fourthwall.com/v1

// ─── Product ─────────────────────────────────────────────────────────────────

export interface FourthwallImage {
  url: string;
  width?: number;
  height?: number;
}

export interface FourthwallPrice {
  value: number;
  currency: string;
}

export interface FourthwallColorAttribute {
  name: string;
  swatch: string; // hex color code
}

export interface FourthwallSizeAttribute {
  name: string;
}

export interface FourthwallVariantAttributes {
  color?: FourthwallColorAttribute;
  size?: FourthwallSizeAttribute;
}

export interface FourthwallVariantStock {
  type: "IN_STOCK" | "OUT_OF_STOCK" | "UNLIMITED";
}

export interface FourthwallVariant {
  id: string;
  name: string;
  unitPrice: FourthwallPrice;
  stock: FourthwallVariantStock;
  images: FourthwallImage[];
  attributes: FourthwallVariantAttributes;
}

export interface FourthwallProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: FourthwallImage[];
  variants: FourthwallVariant[];
}

export interface FourthwallProductsResponse {
  results: FourthwallProduct[];
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export interface FourthwallCartItemVariant {
  id: string;
  name: string;
  unitPrice: FourthwallPrice;
  images: FourthwallImage[];
}

export interface FourthwallCartItem {
  quantity: number;
  variant: FourthwallCartItemVariant;
}

export interface FourthwallCart {
  id: string;
  items: FourthwallCartItem[];
}

// ─── Cart Mutation Payloads ──────────────────────────────────────────────────

export interface CartItemPayload {
  variantId: string;
  quantity?: number;
}

export interface CartMutationPayload {
  items: CartItemPayload[];
}
