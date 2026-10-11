import SkeletonLoader from "@/components/SkeletonLoader";

export default function Loading() {
  return (
    <div className="space-y-6 py-6 font-bangla">
      <div className="h-8 bg-slate-200 rounded-lg w-1/3 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <SkeletonLoader key={n} />
        ))}
      </div>
    </div>
  );
}