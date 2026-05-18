"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/stores/cart-store";
import { getCheckoutUrl } from "@/lib/fourthwall";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const cart = useCartStore((s) => s.cart);
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const subtotal = useCartStore((s) => s.subtotal);
  const cartId = useCartStore((s) => s.cartId);

  const items = cart?.items ?? [];
  const total = subtotal();

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function handleCheckout() {
    if (!cartId) return;
    window.location.href = getCheckoutUrl(cartId);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-neutral-900 z-50 flex flex-col border-l border-white/10 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-syncopate uppercase text-lg tracking-wider">
                Operational List
              </h2>
              <button
                onClick={closeCart}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 font-mono text-sm">
              {items.length === 0 ? (
                <div className="text-white/30 uppercase tracking-widest text-center mt-10">
                  List Empty
                </div>
              ) : (
                items.map((item) => {
                  const fullName = item.variant?.name ?? "Unknown Asset";
                  const nameParts = fullName.split(" - ");
                  const title = nameParts[0];
                  const variantName =
                    nameParts.length > 1 ? nameParts[1] : "";
                  const unitPrice = item.variant?.unitPrice?.value ?? 0;
                  const currency = item.variant?.unitPrice?.currency ?? "USD";
                  const lineTotal = unitPrice * item.quantity;
                  const imgUrl =
                    item.variant?.images?.[0]?.url ?? "";

                  return (
                    <div
                      key={item.variant.id}
                      className="flex gap-4 border-b border-white/10 pb-4 relative group/item"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.variant.id)}
                        className="remove-item-btn absolute top-0 right-0 p-1 text-white/30 hover:text-white opacity-0 group-hover/item:opacity-100 transition-opacity"
                        title="Remove Item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Thumbnail */}
                      <div className="w-16 h-20 bg-black overflow-hidden shrink-0 border border-white/10 flex items-center justify-center">
                        {imgUrl && (
                          <Image
                            src={imgUrl}
                            alt={title}
                            width={64}
                            height={80}
                            className="w-full h-full object-cover opacity-80"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="text-white font-syncopate uppercase text-xs line-clamp-1">
                            {title}
                          </h4>
                          <p className="text-white/50 text-[10px] uppercase mt-1">
                            {variantName || "Standard"}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-0 border border-white/15">
                            <button
                              onClick={() => removeItem(item.variant.id)}
                              className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors text-xs"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-8 h-7 flex items-center justify-center text-white text-[11px] border-x border-white/15">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addItem(item.variant.id)}
                              className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors text-xs"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-white/80 text-xs">
                            {formatPrice(lineTotal, currency)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black">
              <div className="flex justify-between font-mono text-sm uppercase text-white/70 mb-4">
                <span>Subtotal</span>
                <span>{formatPrice(total, "USD")}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full beams-cta text-center !block"
              >
                Authorize Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
