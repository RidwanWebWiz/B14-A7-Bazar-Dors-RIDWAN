import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between antialiased">
        <Navbar />
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}