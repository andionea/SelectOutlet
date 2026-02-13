import { getInventory } from "@/src/lib/inventory";
import ProductCard from "@/src/components/ProductCard";
import { notFound } from "next/navigation";
import { Product } from "@/src/types/product";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Map slugs to your EXACT Airtable Categorie names
  const categoryMapping: Record<string, string> = {
    men: "Barbati",
    women: "Femei",
    kids: "Copii",
    accesorii: "Accesorii", // Match your Airtable exactly
    outlet: "Outlet", // Used for the "Oferte" page
  };

  const airtableCategory = categoryMapping[slug.toLowerCase()];
  if (!airtableCategory) return notFound();

  const products = await getInventory(airtableCategory);

  const displayTitles: Record<string, string> = {
    Barbati: "Bărbați",
    Femei: "Femei",
    Copii: "Copii",
    Accesorii: "Accesorii",
    Outlet: "Oferte Outlet",
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-gray-50 py-20 border-b border-gray-100 mb-12 text-center">
        <span className="text-[#C5A059] font-bold tracking-[0.4em] text-[10px] uppercase">
          Selecție Premium
        </span>
        <h1 className="text-5xl font-black tracking-tighter text-black uppercase mt-4">
          Colecție{" "}
          <span className="text-[#C5A059]">
            {displayTitles[airtableCategory]}
          </span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
