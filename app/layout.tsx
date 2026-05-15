import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CartInitializer from "@/components/CartInitializer";
import Toast from "@/components/Toast";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Delta V — Aerospace Apparel",
    template: "%s | Delta V",
  },
  description:
    "Aerospace and defense apparel engineered for the trajectory of the high-end aviator. Define your vector.",
  keywords: [
    "Delta V",
    "aerospace apparel",
    "aviation clothing",
    "military streetwear",
    "fighter pilot",
    "aviation fashion",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Delta V Aerospace",
    title: "Delta V — Aerospace Apparel",
    description:
      "Aerospace and defense apparel engineered for the trajectory of the high-end aviator.",
    images: [
      {
        url: "/assets/logo-text-white.png",
        width: 1200,
        height: 630,
        alt: "Delta V — Define Your Vector",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delta V — Aerospace Apparel",
    description:
      "Aerospace and defense apparel engineered for the trajectory of the high-end aviator.",
    images: ["/assets/logo-text-white.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
  metadataBase: new URL("https://deltav-shop.fourthwall.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased min-h-screen flex flex-col">
        <CustomCursor />
        <CartInitializer />
        <Header />
        <Toast />
        <SmoothScroll>
          <main className="flex-1 mt-16">{children}</main>
        </SmoothScroll>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
