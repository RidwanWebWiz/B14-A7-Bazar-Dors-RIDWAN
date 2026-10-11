import SkeletonLoader from "@/components/SkeletonLoader";

export default function Loading() {
  return (
    <div className="w-full space-y-8 font-bangla py-6">
     
      <div className="flex items-center justify-center gap-3 bg-white/80 border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
        <span className="loading loading-spinner loading-md text-emerald-600"></span>
        <span className="text-sm font-semibold text-slate-600">
          বাজারের সর্বশেষ তথ্য লোড হচ্ছে...
        </span>
      </div>

      <div className="w-full h-36 sm:h-44 bg-slate-200/80 rounded-3xl animate-pulse flex flex-col justify-center px-8 space-y-3">
        <div className="h-6 bg-slate-300 rounded-md w-1/3"></div>
        <div className="h-4 bg-slate-300 rounded-md w-1/2"></div>
      </div>

      <div className="space-y-4">
        <div className="h-6 bg-slate-200 rounded-md w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonLoader key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}