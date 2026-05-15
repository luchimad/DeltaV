"use client";

import { useEffect } from "react";
import { useCartStore } from "@/stores/cart-store";

/** Mounts once in the root layout to hydrate the cart from localStorage. */
export default function CartInitializer() {
  const initCart = useCartStore((s) => s.initCart);

  useEffect(() => {
    initCart();
  }, [initCart]);

  return null;
}
