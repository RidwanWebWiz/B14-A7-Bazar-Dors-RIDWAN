export default function SkeletonLoader() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs animate-pulse space-y-4">
      
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-200 shrink-0" />
        <div className="space-y-2 flex-1 pt-1">
          <div className="h-4 bg-slate-200 rounded-md w-3/4" />
          <div className="h-3 bg-slate-200 rounded-md w-1/2" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
        <div className="space-y-1.5 w-1/2">
          <div className="h-3 bg-slate-200 rounded-md w-1/3" />
          <div className="h-5 bg-slate-200 rounded-md w-2/3" />
        </div>
        <div className="h-6 bg-slate-200 rounded-full w-12" />
      </div>
    </div>
  );
}