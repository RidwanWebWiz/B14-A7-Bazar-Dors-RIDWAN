import Link from "next/link";
import Image from "next/image";
import { formatBanglaPrice, formatChangeBadge } from "@/lib/utils";

interface ProductCardProps {
  slug: string;
  name: string;
  emoji: string; // Can be an emoji string or image path
  unit: string;
  price: number;
  change: number; // percentage change
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

  // Format unit text cleanly in Bangla
  const displayUnit =
    unit === "kg" || unit === "প্রতি কেজি"
      ? "প্রতি কেজি"
      : unit === "litre"
      ? "প্রতি লিটার"
      : unit;

  // Check if emoji string is actually an image file path (starts with / or http)
  const isImage = emoji && (emoji.startsWith("/") || emoji.startsWith("http"));

  return (
    <Link
      href={`/product/${slug}`}
      className="bg-white border border-slate-200/85 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between font-bangla group"
    >
      {/* Top Row: Icon/Emoji & Name */}
      <div className="flex items-start gap-4">
        {/* Image / Emoji Container */}
        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform overflow-hidden relative">
          {isImage ? (
            <Image
              src={emoji}
              alt={name}
              width={32}
              height={32}
              className="object-contain"
            />
          ) : (
            <span>{emoji || "🛒"}</span>
          )}
        </div>

        <div>
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
            {name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{displayUnit}</p>
        </div>
      </div>

      {/* Bottom Section: Price & Right-Aligned Badge */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-end justify-between">
        <div>
          <span className="text-xs text-slate-400 block mb-0.5">আজকের দাম</span>
          <span className="text-xl font-extrabold text-slate-900">
            {formatBanglaPrice(price)}{" "}
            <span className="text-xs font-semibold text-slate-600">টাকা</span>
          </span>
        </div>

        {/* Bottom Right Percentage Badge */}
        <div
          className={`px-2.5 py-1 rounded-full text-xs font-bold ${badge.className}`}
        >
          {badge.text}
        </div>
      </div>
    </Link>
  );
}