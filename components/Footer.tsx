import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full pb-0 border-t border-white/10 bg-black mt-20">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between p-10 max-w-7xl mx-auto">
        {/* Brand Column */}
        <div className="flex flex-col items-start justify-start gap-y-5 max-w-xs mx-0">
          <Link
            href="/"
            className="flex items-center hover:opacity-70 transition-opacity"
          >
            <Image
              src="/assets/logo-notext-white.png"
              alt="Delta V"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <p className="text-white/50 text-sm leading-relaxed mt-2">
            Change your velocity.<br />
            Define your vector.
          </p>
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40 font-mono font-bold">
            Vector Log: Active
          </p>
        </div>

        {/* Links Column */}
        <div className="pt-8 md:pt-0 flex flex-col sm:flex-row gap-12 sm:gap-24">
          <div className="flex flex-col gap-y-3 font-mono">
            <p className="mb-2 text-[0.65rem] tracking-[0.2em] uppercase text-white/40 font-bold">
              Vectors
            </p>
            <Link
              href="/collection/aero"
              className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              Aero
            </Link>
            <Link
              href="/collection/signature"
              className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              Signature
            </Link>
            <Link
              href="/about"
              className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              About Us
            </Link>
          </div>

          <div className="flex flex-col gap-y-3 font-mono">
            <p className="mb-2 text-[0.65rem] tracking-[0.2em] uppercase text-white/40 font-bold">
              Intel
            </p>
            <a
              href="https://deltav-shop.fourthwall.com/pages/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              Terms of Service
            </a>
            <a
              href="https://deltav-shop.fourthwall.com/pages/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              Privacy Policy
            </a>
            <a
              href="https://deltav-shop.fourthwall.com/pages/returns-faq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              Returns FAQ
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-white/5 border-t border-white/10 py-6 mt-8">
        <p className="text-center text-[0.65rem] text-white/40 tracking-[0.15em] uppercase font-mono font-bold">
          © 2026 DELTA V CLOTHING CO.
        </p>
      </div>
    </footer>
  );
}
