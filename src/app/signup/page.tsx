"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }
    router.push("/profile");
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center font-bangla py-8">
      <div className="text-center space-y-1 mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-slate-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">নাম</label>
            <input
              type="text"
              required
              placeholder="যেমন: রহিম উদ্দিন"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 bg-slate-50/50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">ইমেইল</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 bg-slate-50/50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 bg-slate-50/50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              required
              placeholder="আবার লিখুন"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 bg-slate-50/50"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="grow border-t border-slate-200"></div>
          <span className="shrink mx-4 text-xs text-slate-400">অথবা</span>
          <div className="grow border-t border-slate-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            <span className="text-sm">G</span> Google দিয়ে চালিয়ে যান
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            <span className="text-sm">🐙</span> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <div className="text-center text-xs text-slate-600 pt-2">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="text-emerald-600 font-bold hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>

      <Link
        href="/"
        className="mt-6 text-xs text-slate-500 hover:text-slate-800 transition-colors"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}