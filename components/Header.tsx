"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cart-store";
import MobileNav from "./MobileNav";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalQuantity = useCartStore((s) => s.totalQuantity);
  const qty = totalQuantity();

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-70 transition-opacity"
          >
            <Image
              src="/assets/logo-notext-white.png"
              alt="Delta V Logo"
              width={24}
              height={24}
              className="h-6 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-mono text-[0.65rem] tracking-[0.1em] uppercase font-semibold">
            <Link
              href="/collection/aero"
              className="nav-link py-2 text-white/80 hover:text-white"
            >
              Aero
            </Link>
            <Link
              href="/collection/signature"
              className="nav-link py-2 text-white/80 hover:text-white"
            >
              Signature
            </Link>
            <Link
              href="/about"
              className="nav-link py-2 text-white/80 hover:text-white"
            >
              About
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button — Tactical Manifest Icon */}
            <button
              onClick={toggleCart}
              className="relative text-white/80 hover:text-white transition-colors group flex items-center gap-2"
              aria-label="Open cart"
            >
              <span className="font-mono text-[0.65rem] tracking-widest hidden md:block">
                MANIFEST
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="2" width="12" height="15" rx="1" />
                <path d="M6.5 1v2.5M11.5 1v2.5" />
                <path d="M6 8h6M6 11h4" />
              </svg>
              <span
                className={`absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center transition-opacity ${
                  qty > 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                {qty}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
              aria-label="Open menu"
            >
              <span className="block w-5 h-px bg-white transition-all duration-300" />
              <span className="block w-5 h-px bg-white transition-all duration-300" />
              <span className="block w-5 h-px bg-white transition-all duration-300" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
