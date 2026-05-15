"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/stores/cart-store";

export default function Toast() {
  const toastMessage = useCartStore((s) => s.toastMessage);
  const hideToast = useCartStore((s) => s.hideToast);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-4 px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)] min-w-[320px]"
          onClick={hideToast}
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
              System Update
            </span>
            <span className="text-sm font-mono tracking-wide text-white">
              {toastMessage}
            </span>
          </div>
          <button className="text-white/50 hover:text-white transition-colors p-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
