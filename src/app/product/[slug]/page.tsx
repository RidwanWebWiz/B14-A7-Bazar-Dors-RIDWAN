"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import products from "@/data/products.json";
import categories from "@/data/categories.json";
import { formatBanglaPrice, formatChangeBadge, convertToBengaliNumber } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Find selected product from JSON data
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 font-bangla space-y-4">
        <div className="text-6xl">📦</div>
        <h2 className="text-2xl font-bold text-slate-900">
          পণ্যটি পাওয়া যায়নি
        </h2>
        <p className="text-slate-500 max-w-sm text-sm">
          আপনি যে পণ্যটি খুঁজছেন তা আমাদের তালিকাভুক্ত নয় অথবা পরিবর্তন করা হয়েছে।
        </p>
        <Link
          href="/"
          className="btn bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 rounded-xl border-none"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.slug === product.category);

  const getSignedChange = (p: typeof products[0]) => {
    if (p.change.dir === "down") return -Math.abs(p.change.pct);
    if (p.change.dir === "flat") return 0;
    return Math.abs(p.change.pct);
  };

  const signedChange = getSignedChange(product);
  const badge = formatChangeBadge(signedChange);

  // Mock regional market price data for the table
  const marketPrices = [
    { name: "মার্কেট বাজার", division: "ময়মনসিংহ", min: 59, max: 65, avg: 62 },
    { name: "সদর বাজার", division: "রাজশাহী", min: 60, max: 66, avg: 63 },
    { name: "বাজারহাট", division: "খুলনা", min: 60, max: 67, avg: 63.50 },
    { name: "বাসারহাট বাজার", division: "রাজশাহী", min: 60, max: 68, avg: 64 },
    { name: "চৌর বাজার", division: "ময়মনসিংহ", min: 60, max: 69, avg: 64.50 },
    { name: "আমতলী বাজার", division: "চট্টগ্রাম", min: 64, max: 69, avg: 65 },
    { name: "ডবলগেট বাজার", division: "খুলনা", min: 62, max: 69, avg: 65.50 },
    { name: "চৌরাস্তা বাজার", division: "সিলেট", min: 63, max: 76, avg: 67 },
    { name: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", min: 64, max: 76, avg: 67.50 },
    { name: "চৌগ্রাম বাজার", division: "চট্টগ্রাম", min: 63, max: 73, avg: 68 },
    { name: "আমবাজার", division: "সিলেট", min: 64, max: 73, avg: 68.50 },
    { name: "কারওয়ান বাজার", division: "ঢাকা", min: 65, max: 73, avg: 69 },
  ];

  const isImage =
    product.image &&
    (product.image.startsWith("/") || product.image.startsWith("http"));

  return (
    <div className="space-y-8 font-bangla py-4">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-600 transition-colors">
          হোম
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/category/${category.slug}`}
              className="hover:text-emerald-600 transition-colors"
            >
              {category.nameBn}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-900 font-semibold">{product.nameBn}</span>
      </nav>

      {/* Main Product Overview Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl shrink-0 shadow-2xs relative">
            {isImage ? (
              <Image
                src={product.image}
                alt={product.nameBn}
                width={56}
                height={56}
                className="object-contain"
              />
            ) : (
              <span>{product.image || "🛒"}</span>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              প্রতি কেজি · {category?.nameBn || "চাল"}
            </p>
            <p className="text-xs text-slate-500 pt-1">
              গতকালের তুলনায় আজ দাম{" "}
              <span className={signedChange >= 0 ? "text-red-600 font-semibold" : "text-emerald-600 font-semibold"}>
                {signedChange >= 0 ? "বেড়েছে" : "কমেছে"}
              </span>{" "}
              · ২ টাকা
            </p>
          </div>
        </div>

        {/* Right Price Box */}
        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 sm:px-6 sm:py-4 flex flex-col items-center md:items-end w-full md:w-auto">
          <span className="text-xs text-slate-500 font-medium">আজকের দাম</span>
          <span className="text-3xl font-black text-slate-900 my-1">
            {formatBanglaPrice(product.today)}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">টাকা / কেজি</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.className}`}>
              {badge.text}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards Section (Minimum, Maximum, Average) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Min Price Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
            <span className="text-xs text-slate-500 font-medium block">সর্বনিম্ন দাম</span>
            <div className="text-2xl font-extrabold text-emerald-600">
              {convertToBengaliNumber(product.today - 3)} <span className="text-sm font-semibold text-slate-700">টাকা</span>
            </div>
            <p className="text-xs text-slate-400">সবচেয়ে কম দামের বাজার</p>
          </div>

          {/* Max Price Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
            <span className="text-xs text-slate-500 font-medium block">সর্বাধিক দাম</span>
            <div className="text-2xl font-extrabold text-red-600">
              {convertToBengaliNumber(product.today + 7)} <span className="text-sm font-semibold text-slate-700">টাকা</span>
            </div>
            <p className="text-xs text-slate-400">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          {/* Average Price Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
            <span className="text-xs text-slate-500 font-medium block">গড় দাম</span>
            <div className="text-2xl font-extrabold text-emerald-600">
              {convertToBengaliNumber(product.today)} <span className="text-sm font-semibold text-slate-700">টাকা</span>
            </div>
            <p className="text-xs text-slate-400">প্রতি কেজি-এর হিসাবে</p>
          </div>
        </div>
      </div>

      {/* Regional Market Prices Table */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-bold text-slate-900">বাজারভিত্তিক আজকের দাম</h2>
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-right sm:text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold">
                  <th className="py-3.5 px-4 text-left">বাজার</th>
                  <th className="py-3.5 px-4 text-left">বিভাগ</th>
                  <th className="py-3.5 px-4 text-left">সর্বনিম্ন</th>
                  <th className="py-3.5 px-4 text-left">সর্বাধিক</th>
                  <th className="py-3.5 px-4 text-left">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                {marketPrices.map((market, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-900">{market.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{market.division}</td>
                    <td className="py-3.5 px-4 text-slate-700">{convertToBengaliNumber(market.min)} টাকা</td>
                    <td className="py-3.5 px-4 text-slate-700">{convertToBengaliNumber(market.max)} টাকা</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{convertToBengaliNumber(market.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}