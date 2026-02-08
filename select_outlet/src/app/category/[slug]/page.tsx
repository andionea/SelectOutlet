import { getInventory } from "@/lib/inventory";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

// Next.js 15 requires 'params' to be a Promise
export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 1. Await the params before using them
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) return notFound();

  // 2. Format the slug for Airtable (e.g., "men" -> "Men")
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  // 3. Fetch filtered data
  const products = await getInventory(categoryName);

  // Security check for valid categories
  const validCategories = ["Men", "Women", "Kids", "Outlet"];
  if (!validCategories.includes(categoryName)) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-gray-50 py-20 border-b border-gray-100 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#C5A059] font-bold tracking-[0.4em] text-[10px] uppercase">
            Selecție Premium
          </span>
          <h1 className="text-5xl font-black tracking-tighter text-black uppercase mt-4">
            {categoryName} <span className="text-[#C5A059]">Collection</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product: { id: any; }) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-100">
            <p className="text-gray-400 uppercase text-[10px] font-bold tracking-widest">
              Niciun produs găsit în această categorie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}