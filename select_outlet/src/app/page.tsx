import Hero from "@/src/components/Hero";
import TrustBar from "@/src/components/TrustBar";
import CategoryBar from "@/src/components/CategoryBar";
import ProductCard from "@/src/components/ProductCard";
import { getInventory } from "@/src/lib/inventory";
import { Product } from "../types/product";

export default async function Home() {
  // Fetch real data from Airtable
  const products = await getInventory();

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <TrustBar />
      <CategoryBar />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-brand-gold font-bold tracking-[0.3em] text-[10px] uppercase">
              Selecție Outlet
            </span>
            <h2 className="text-3xl font-bold tracking-tighter text-black uppercase">
              Cele mai noi <span className="text-brand-gold">Reduceri</span>
            </h2>
          </div>
        </div>

        {/* The Live Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          
          {products.length === 0 && (
            <p className="col-span-full text-center py-20 text-gray-400">
              Momentan nu sunt produse disponibile.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}