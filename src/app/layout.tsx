import type { Metadata } from "next";
import { inter, hindSiliguri } from "@/lib/fonts";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${inter.variable} ${hindSiliguri.variable}`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col justify-between">
        <Toaster position="top-right" />
        
        {/* Sticky Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
          {children}
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}