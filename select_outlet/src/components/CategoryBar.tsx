import Link from 'next/link';

const categories = [
  { name: 'Bărbați', slug: 'men' },
  { name: 'Femei', slug: 'women' },
  { name: 'Copii', slug: 'kids' },
  { name: 'Accesorii', slug: 'accesorii' },
  { name: 'Oferte', slug: 'outlet', highlight: true },
];

export default function CategoryBar() {
  return (
    <div className="w-full bg-white border-b border-gray-100 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* MOBILE: Horizontal scroll with 'no-scrollbar'
            DESKTOP: Flex row with generous spacing
        */}
        <div className="flex overflow-x-auto no-scrollbar py-6 md:justify-center gap-8 md:gap-16 items-center">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex-shrink-0 group relative py-2"
            >
              <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 
                ${cat.highlight 
                  ? 'text-red-700 hover:text-red-800' 
                  : 'text-gray-400 group-hover:text-black'
                }`}
              >
                {cat.name}
              </span>
              
              {/* Luxury Touch: A subtle gold underline that expands on hover */}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 group-hover:w-full
                ${cat.highlight ? 'bg-red-700' : ''}`}
              ></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}