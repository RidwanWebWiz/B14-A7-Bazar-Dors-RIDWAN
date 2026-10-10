"use client";

import Link from "next/link";
import { formatBanglaPrice, formatChangeBadge } from "@/lib/utils";

interface ProductCardProps {
  slug: string;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
}

export default function ProductCard({
  slug,
  name,
  emoji,
  unit,
  price,
  change,
}: ProductCardProps) {
  const badge = formatChangeBadge(change);

  return (
    <Link
      href={`/product/${slug}`}
      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-slate-200 p-4 font-bangla rounded-xl cursor-pointer block"
    >
      {/* 📷 Emoji / Illustration */}
      <div className="text-4xl mb-2 flex items-center justify-center bg-slate-50 rounded-lg p-3 w-fit">
        {emoji}
      </div>

      {/* 📛 Product Name */}
      <h3 className="font-semibold text-lg text-slate-900 mt-1">{name}</h3>

      {/* 🖇️ Unit Line */}
      <p className="text-xs text-slate-500 mb-4">{unit}</p>

      {/* 🔴 Price Row */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
        <div>
          <span className="text-xs text-slate-400 block">আজকের দাম</span>
          <span className="font-bold text-slate-800 text-base">
            {formatBanglaPrice(price)}
          </span>
        </div>

        {/* Change Badge ▲ / ▼ / — */}
        <span className={`${badge.className} text-xs font-semibold px-2.5 py-1 rounded-full`}>
          {badge.text}
        </span>
      </div>
    </Link>
  );
}