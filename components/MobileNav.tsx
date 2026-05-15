"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const linkVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const navLinks = [
  { href: "/collection/aero", label: "Aero" },
  { href: "/collection/signature", label: "Signature" },
  { href: "/about", label: "About" },
];

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 md:hidden"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.35 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-6 text-white/50 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 7L7 21M7 7l14 14" />
            </svg>
          </button>

          {/* Nav Links */}
          <div className="text-center flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-syncopate uppercase text-white/70 hover:text-white transition-colors leading-[1.2]"
                  style={{ fontSize: "clamp(2rem, 8vw, 4rem)", letterSpacing: "0.05em" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Tagline */}
          <div className="absolute bottom-8 font-mono text-[0.6rem] tracking-[0.2em] text-white/30 uppercase">
            Delta V Aerospace &mdash; Define Your Vector
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
