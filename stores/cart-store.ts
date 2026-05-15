"use client";

import { create } from "zustand";
import type { FourthwallCart } from "@/lib/types";
import {
  createCart,
  getCart,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
} from "@/lib/fourthwall";

// ─── Store Interface ─────────────────────────────────────────────────────────

interface CartStore {
  cartId: string | null;
  cart: FourthwallCart | null;
  isOpen: boolean;
  isLoading: boolean;

  // Drawer actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Cart data actions
  initCart: () => Promise<void>;
  addItem: (variantId: string) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;

  // Derived data
  totalQuantity: () => number;
  subtotal: () => number;
}

// ─── localStorage helpers ────────────────────────────────────────────────────

function persistCartId(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) {
    localStorage.setItem("cartId", id);
  } else {
    localStorage.removeItem("cartId");
  }
}

function loadCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cartId");
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useCartStore = create<CartStore>((set, get) => ({
  cartId: null,
  cart: null,
  isOpen: false,
  isLoading: false,

  // ── Drawer ──────────────────────────────────────────────────────────────

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

  // ── Init ────────────────────────────────────────────────────────────────

  initCart: async () => {
    const storedId = loadCartId();
    if (storedId) {
      try {
        const cart = await getCart(storedId);
        set({ cartId: storedId, cart });
      } catch {
        // Cart expired or invalid — clear it
        persistCartId(null);
        set({ cartId: null, cart: null });
      }
    }
  },

  // ── Add Item ────────────────────────────────────────────────────────────

  addItem: async (variantId: string) => {
    set({ isLoading: true });
    try {
      let { cartId } = get();

      // Ensure a cart exists
      if (!cartId) {
        const newCart = await createCart();
        cartId = newCart.id;
        persistCartId(cartId);
        set({ cartId });
      }

      const cart = await apiAddToCart(cartId, {
        items: [{ variantId, quantity: 1 }],
      });

      set({ cart, isLoading: false });
    } catch (err) {
      console.error("Failed to add item:", err);
      set({ isLoading: false });
      throw err;
    }
  },

  // ── Remove Item ─────────────────────────────────────────────────────────

  removeItem: async (variantId: string) => {
    const { cartId } = get();
    if (!cartId) return;

    set({ isLoading: true });
    try {
      const cart = await apiRemoveFromCart(cartId, {
        items: [{ variantId }],
      });
      set({ cart, isLoading: false });
    } catch (err) {
      console.error("Failed to remove item:", err);
      set({ isLoading: false });
    }
  },

  // ── Computed ────────────────────────────────────────────────────────────

  totalQuantity: () => {
    const { cart } = get();
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  subtotal: () => {
    const { cart } = get();
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (sum, item) => sum + item.variant.unitPrice.value * item.quantity,
      0
    );
  },
}));
