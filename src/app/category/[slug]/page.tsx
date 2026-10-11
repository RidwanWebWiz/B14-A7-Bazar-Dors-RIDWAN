"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import categories from "@/data/categories.json";
import products from "@/data/products.json";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [sortOption, setSortOption] = useState("default");
  const [isPending, startTransition] = useTransition();

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 font-bangla space-y-4">
        <div className="text-6xl">🔍</div>
        <h2 className="text-2xl font-bold text-slate-900">পাতাটি পাওয়া যায়নি</h2>
        <Link href="/" className="btn bg-emerald-600 text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const categoryProducts = products.filter((p) => p.category === slug);

  const getSignedChange = (p: typeof products[0]) => {
    if (p.change.dir === "down") return -Math.abs(p.change.pct);
    if (p.change.dir === "flat") return 0;
    return Math.abs(p.change.pct);
  };

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortOption === "low-to-high") return a.today - b.today;
    if (sortOption === "high-to-low") return b.today - a.today;
    return 0;
  });

  return (
    <div className="space-y-6 font-bangla py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 flex items-center justify-center">
            {category.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {category.nameBn} বাজারের দাম
            </h1>
            <p className="text-xs text-slate-500">
              মোট {categoryProducts.length}টি পণ্য পাওয়া গেছে
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">সাজান:</span>
          <select
            value={sortOption}
            onChange={(e) => {
              startTransition(() => {
                setSortOption(e.target.value);
              });
            }}
            className="select select-bordered select-sm bg-white border-slate-300 text-slate-700 font-medium rounded-lg"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isPending
          ? Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonLoader key={idx} />
            ))
          : sortedProducts.map((p) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.nameBn}
                emoji={p.image}
                unit={p.unit}
                price={p.today}
                change={getSignedChange(p)}
              />
            ))}
      </div>
    </div>
  );
}