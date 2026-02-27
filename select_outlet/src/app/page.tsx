import Hero from "@/src/components/Hero";
import TrustBar from "@/src/components/TrustBar";
import ProductCard from "@/src/components/ProductCard";
import SocialSection from "@/src/components/SocialSection";
import { getInventory } from "@/src/lib/inventory";
import { Product } from "@/src/types/product";

export const dynamic = "force-dynamic"; // Forțează regenerarea la fiecare request pentru a reflecta stocul în timp real

export default async function Home() {
  // Preluăm datele direct din Airtable folosind bridge-ul nostru de inventar
  const products = await getInventory();

  // 1. Filtrarea produselor pe categorii
  const discountProducts = products.filter((p: Product) => p.hasDiscount);
  const newArrivals = products.filter((p: Product) => p.isNew);

  // 2. Funcție pentru randomizare (Shuffle)
  const shuffle = (array: Product[]) =>
    [...array].sort(() => 0.5 - Math.random());

  // 3. Pregătirea listelor randomizate (limităm la 8 produse per grid pentru performanță)
  const randomDiscounts = shuffle(discountProducts).slice(0, 8);
  const randomNewEntries = shuffle(newArrivals).slice(0, 8);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Secțiunea Hero - Impact vizual maxim (85% din ecran pe desktop) */}
      <Hero />

      {/* 2. TrustBar - Elemente de încredere (Livrare, Retur, Calitate) */}
      <TrustBar />

      {/* 3. Secțiunea de produse - Oferte și Noutăți */}
      {/* SECȚIUNEA 1: Produse cu Discount */}
      {randomDiscounts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 md:py-8 border-b border-gray-200">
          <div className="mb-10 text-center md:text-left">
            <span className="text-[#C5A059] font-bold tracking-[0.3em] text-[10px] uppercase block mb-2">
              Prețuri Reduse
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black uppercase">
              Oferte <span className="text-[#C5A059]">Exclusive</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-5 md:gap-x-4 md:gap-y-12">
            {randomDiscounts.map((product: Product) => (
              <ProductCard key={`discount-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* SECȚIUNEA 2: Noutăți */}
      {randomNewEntries.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 md:py-8 border-b border-gray-200">
          <div className="mb-10 text-center md:text-left">
            <span className="text-[#C5A059] font-bold tracking-[0.3em] text-[10px] uppercase block mb-2">
              Proaspăt intrate în stoc
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black uppercase">
              Colecția <span className="text-[#C5A059]">Nouă</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-5 md:gap-x-4 md:gap-y-12">
            {randomNewEntries.map((product: Product) => (
              <ProductCard key={`new-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Secțiunea Social Media - Butoane de follow și feed vizual */}
      <SocialSection />
    </main>
  );
}
