import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 font-bangla">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">
        পাতাটি পাওয়া যায়নি (৪০০)
      </h2>
      <p className="text-slate-600 mb-6 max-w-md">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল ঠিকানায় প্রবেশ করেছেন।
      </p>
      <Link
        href="/"
        className="btn bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 rounded-xl"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}