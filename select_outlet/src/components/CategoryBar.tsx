const categories = ["All Products", "Evening Dresses", "Sport Sets", "Men's Jackets", "Accessories"];

export default function CategoryBar() {
  return (
    <div className="flex justify-center gap-4 py-10 overflow-x-auto px-4 no-scrollbar">
      {categories.map((cat) => (
        <button key={cat} className="whitespace-nowrap px-6 py-2 border border-gray-200 rounded-full text-[11px] font-bold uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-all">
          {cat}
        </button>
      ))}
    </div>
  );
}