import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-[#f7f9f6] border border-slate-200/80 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 font-bangla shadow-xs">
       <div className="space-y-4 max-w-xl text-left">
        
        <div className="inline-flex items-center bg-emerald-100/70 text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full">
          শনিবার, ১০ অক্টোবর, ২০২৬
        </div>

       
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
          আজকের বাজারের দাম এক নজরে
        </h1>

      
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

     
        <div className="pt-2">
          <Link
            href="#সব-পণ্য"
            className="btn bg-[#00873e] hover:bg-[#007032] text-white font-semibold px-6 py-3 rounded-xl border-none shadow-sm transition-all text-sm"
          >
            সব পণ্য দেখুন
          </Link>
        </div>
      </div>

      
      <div className="w-full md:w-auto flex justify-center items-center">
        <div className="relative w-64 h-56 sm:w-80 sm:h-64 flex items-center justify-center">
          
          <Image
            src="/image/bazar-hero 1.png" 
            alt="Market Fruit Basket"
            fill
            className="object-contain drop-shadow-md"
            priority
          />
        </div>
      </div>
    </div>
  );
}