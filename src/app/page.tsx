import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

export default function Home() {
  const getSignedChange = (p: typeof products[0]) => {
    if (p.change.dir === "down") return -Math.abs(p.change.pct);
    if (p.change.dir === "flat") return 0;
    return Math.abs(p.change.pct);
  };

  const topRisers = [...products]
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const topFallers = [...products]
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-12 font-bangla py-6">
      <Hero />

      {/* Section A — Risers (3 Columns) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <span className="text-xl">▲</span>
          <h2 className="text-xl font-bold text-slate-800">আজ দাম বেড়েছে</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topRisers.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              name={product.nameBn}
              emoji={product.image}
              unit={product.unit}
              price={product.today}
              change={getSignedChange(product)}
            />
          ))}
        </div>
      </section>

      {/* Section B — Fallers (3 Columns) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <span className="text-xl text-emerald-600">▼</span>
          <h2 className="text-xl font-bold text-slate-800">আজ দাম কমেছে</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topFallers.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              name={product.nameBn}
              emoji={product.image}
              unit={product.unit}
              price={product.today}
              change={getSignedChange(product)}
            />
          ))}
        </div>
      </section>

      {/* Section C — All Products (3 Columns) */}
      <section id="সব-পণ্য" className="space-y-4 pt-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-2xl font-bold text-slate-900">সব পণ্য</h2>
          <p className="text-sm text-slate-500">
            নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের বাজার দর এক নজরে
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              name={product.nameBn}
              emoji={product.image}
              unit={product.unit}
              price={product.today}
              change={getSignedChange(product)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}