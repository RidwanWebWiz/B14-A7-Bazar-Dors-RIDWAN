"use client";

import { useState } from "react";
import { requestPasswordReset } from "@/auth-client";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });
      if (res.error) {
        setError(res.error.message || "রিসেট লিংক পাঠানো যায়নি।");
      } else {
        setMessage("পাসওয়ার্ড রিসেট করার লিংক আপনার ইমেইলে পাঠানো হয়েছে।");
      }
    } catch {
      setError("একটি ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center font-bangla py-8">
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs space-y-5">
        <h1 className="text-2xl font-extrabold text-slate-900 text-center">পাসওয়ার্ড ভুলে গেছেন?</h1>
        {error && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl">{error}</div>}
        {message && <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl">{message}</div>}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700">আপনার একাউন্ট ইমেইল</label>
            <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl">
            {loading ? "পাঠানো হচ্ছে..." : "রিসেট লিংক পাঠান"}
          </button>
        </form>
        <div className="text-center text-xs">
          <Link href="/signin" className="text-emerald-600 font-bold hover:underline">← সাইন ইন পেজে ফিরে যান</Link>
        </div>
      </div>
    </div>
  );
}