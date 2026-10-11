"use client";

import { useSession, signOut } from "@/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-bangla">
        <span className="loading loading-spinner loading-md text-emerald-600"></span>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto py-12 font-bangla space-y-6">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs space-y-4">
        <h1 className="text-2xl font-extrabold text-slate-900">ইউজার প্রোফাইল</h1>
        
        <div className="space-y-2 text-sm text-slate-700">
          <p><strong>নাম:</strong> {session.user.name}</p>
          <p><strong>ইমেইল:</strong> {session.user.email}</p>
        </div>

        <button
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          সাইন আউট করুন
        </button>
      </div>
    </div>
  );
}