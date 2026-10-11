export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6 font-bangla py-12">
      
      <div className="relative flex items-center justify-center">
        
        <div className="w-20 h-20 bg-emerald-100 rounded-full animate-ping opacity-75 absolute"></div>
        
        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg relative z-10 animate-bounce">
          🛒
        </div>
      </div>

      
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
          <span>বাজারের তথ্য লোড হচ্ছে</span>
          <span className="loading loading-dots loading-sm text-emerald-600"></span>
        </div>
        <p className="text-xs text-slate-400">
          অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন...
        </p>
      </div>
    </div>
  );
}