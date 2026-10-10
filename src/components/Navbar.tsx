"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { formatBanglaPrice, formatChangeBadge } from "@/lib/utils";
import categories from "@/data/categories.json";
import products from "@/data/products.json"; // 👈 Import products directly for the sliding ticker

interface NavbarProps {
  user?: {
    name: string;
    avatar?: string;
  } | null;
}

export default function Navbar({ user = null }: NavbarProps) {
  const pathname = usePathname();

  // Map products for the 3rd layer sliding ticker strip
  const tickerItems = products.map((p) => ({
    id: p.id,
    emoji: p.image,
    name: p.nameBn,
    price: p.today,
    unit: p.unit === "kg" ? "কেজি" : "লিটার",
    change: p.change.dir === "down" ? -p.change.pct : p.change.pct,
  }));

  const marqueeList = [...tickerItems, ...tickerItems];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs font-bangla">
      {/* 🔴 LAYER 1: Top Bar (Logo, Date & Auth Buttons) */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between border-b border-slate-100">
        {/* Left Logo + Title + Date */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl shadow-sm group-hover:bg-emerald-700 transition-colors">
            🛒
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-900 leading-tight">
              বাজার দর
            </h1>
            <p className="text-xs text-slate-500">
              শনিবার, ১০ অক্টোবর, ২০২৬
            </p>
          </div>
        </Link>

        {/* Right Corner: Beautified Sign In / Sign Up OR User Profile */}
        <div>
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm gap-2 normal-case font-medium text-slate-700 hover:bg-slate-100 rounded-full py-1.5 px-3.5 border border-slate-200 shadow-2xs cursor-pointer"
              >
                <Image
                  src={user.avatar || "https://i.pravatar.cc/150?img=68"}
                  alt={user.name}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full object-cover border border-slate-300"
                />
                <span className="text-sm font-semibold">{user.name}</span>
                <span className="text-xs text-slate-400">▼</span>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-2xl w-48 border border-slate-100 mt-2 font-medium"
              >
                <li>
                  <Link href="/profile" className="rounded-lg">মাই প্রোফাইল</Link>
                </li>
                <li>
                  <Link href="/profile/update" className="rounded-lg">তথ্য আপডেট করুন</Link>
                </li>
                <li className="border-t border-slate-100 mt-1 pt-1">
                  <button className="text-error rounded-lg">সাইন আউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/signin"
                className="btn btn-sm btn-ghost font-semibold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 rounded-xl px-4 transition-all"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 rounded-xl border-none shadow-sm hover:shadow transition-all"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 🟢 LAYER 2: Category Navigation Links */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3 overflow-x-auto no-scrollbar border-b border-slate-100 text-sm">
        {categories.map((cat) => {
          const isActive = pathname === `/category/${cat.slug}`;
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                isActive
                  ? "bg-emerald-600 text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          );
        })}
      </div>

      {/* 🔵 LAYER 3: Sliding / Infinite Scrolling Price Ticker */}
      <div className="bg-slate-50/90 border-t border-slate-100 overflow-hidden py-2 relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-4">
          {marqueeList.map((item, index) => {
            const badge = formatChangeBadge(item.change);
            return (
              <div
                key={`${item.id}-${index}`}
                className="inline-flex items-center gap-2 text-xs text-slate-700 px-3.5 py-1.5 bg-white rounded-lg border border-slate-200/70 shadow-2xs"
              >
                <span className="text-sm">{item.emoji}</span>
                <span className="font-semibold text-slate-800">{item.name}</span>
                <span className="font-bold text-slate-900">
                  {formatBanglaPrice(item.price)}/{item.unit}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${badge.className}`}>
                  {badge.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}