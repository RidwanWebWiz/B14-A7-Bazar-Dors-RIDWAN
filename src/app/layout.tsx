import type { Metadata } from "next";
import { inter, hindSiliguri } from "@/lib/fonts";
import { Toaster } from "react-hot-toast";
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
      <body className="font-sans min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col justify-between">
        <Toaster position="top-right" />
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}