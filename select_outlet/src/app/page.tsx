import Hero from "@/src/components/Hero";
import TrustBar from "@/src/components/TrustBar";
import ProductCard from "@/src/components/ProductCard";
import { getInventory } from "@/src/lib/inventory";
import { Product } from "@/src/types/product";

export default async function Home() {
  // Preluăm datele direct din Airtable folosind bridge-ul nostru de inventar
  const products = await getInventory();

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Secțiunea Hero - Impact vizual maxim (85% din ecran pe desktop) */}
      <Hero />

      {/* 2. TrustBar - Elemente de încredere (Livrare, Retur, Calitate) */}
      <TrustBar />

      {/* 3. Secțiunea de Produse - Grid adaptiv: 2 coloane pe mobil, 4 pe desktop */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
          <div>
            <span className="text-[#C5A059] font-bold tracking-[0.3em] text-[10px] uppercase block mb-2">
              Selecție Outlet
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black uppercase">
              Cele mai noi <span className="text-[#C5A059]">Reduceri</span>
            </h2>
          </div>
          
          <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-1">
            {products.length} Produse disponibile
          </div>
        </div>

        {/* Grid-ul de produse - Folosim spațiere generoasă (gap-8) pentru un look premium */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mesaj în cazul în care nu sunt produse (fallback) */}
        {products.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-lg">
            <p className="text-gray-400 uppercase text-[10px] font-bold tracking-widest">
              Momentan stocul se actualizează. Reveniți curând!
            </p>
          </div>
        )}
      </section>
    </main>
  );
}