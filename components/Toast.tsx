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
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-4 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl min-w-[300px]"
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
