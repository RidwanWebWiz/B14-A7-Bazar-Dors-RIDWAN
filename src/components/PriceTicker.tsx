import Link from "next/link";
import products from "@/data/products.json";
import { formatBanglaPrice, formatChangeBadge } from "@/lib/utils";

export default function PriceTicker() {
  const getSignedChange = (p: typeof products[0]) => {
    if (p.change.dir === "down") return -Math.abs(p.change.pct);
    if (p.change.dir === "flat") return 0;
    return Math.abs(p.change.pct);
  };

  return (
    <div className="w-full bg-white border-b border-slate-200/80 overflow-hidden font-bangla py-2.5 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 flex items-center">
       
        <div className="flex space-x-8 animate-marquee whitespace-nowrap overflow-x-auto scrollbar-none py-1">
          {products.map((product) => {
            const signedChange = getSignedChange(product);
            const badge = formatChangeBadge(signedChange);

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-emerald-700 transition-colors shrink-0 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1"
              >
                <span className="text-base">{product.image && !product.image.startsWith("/") ? product.image : "🛒"}</span>
                <span className="font-bold text-slate-900">{product.nameBn}</span>
                <span className="text-slate-500">
                  {formatBanglaPrice(product.today)} টাকা/{product.unit === "kg" ? "কেজি" : product.unit}
                </span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${badge.className}`}>
                  {badge.text}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}