"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/src/types/product'; // Adjust path if your types folder is inside src
import { useCart } from '@/src/lib/store'; // Adjust path if your store is inside src

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the Link from firing
    e.stopPropagation(); // Prevents the click from bubbling up to the Link
    addItem(product); // Add the product to the cart
  }
  // Calculate the discount percentage based on outlet pricing logic
  const discount = Math.round(((product.originalPrice - product.outletPrice) / product.originalPrice) * 100);

  return (
    <div className="group relative bg-white overflow-hidden border border-transparent hover:border-gray-100 transition-all duration-300">
      {/* 1. Navigable Area: Clicking the image or text goes to the product page */}
      <Link href={`/product/${product.id}`} className="block">
        
        {/* Visual Badges (Urgency Layer - Inspired by outletmag.ro) */}
        <div className="absolute top-0 left-0 z-10 flex flex-col">
          {discount > 0 && (
            <div className="bg-brand-red text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-tighter">
              -{discount}% OFF
            </div>
          )}
          {product.isNew && (
            <div className="bg-brand-black text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-tighter">
              New Entry
            </div>
          )}
        </div>

        {/* Image Container (Luxury Layer - Inspired by giafashion.ro) */}
        <div className="aspect-[2/3] relative bg-brand-gray overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Quick-view overlay appearing on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end">
            <div className="w-full bg-brand-black text-white py-4 text-[11px] font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2">
              <ShoppingCart size={14} /> Quick View
            </div>
          </div>
        </div>

        {/* Product Info (Clean Style) */}
        <div className="py-5 px-2 text-center md:text-left">
          <h3 className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1.5 font-bold">
            {product.brand}
          </h3>
          <p className="text-sm font-medium text-brand-black truncate mb-2 px-1">
            {product.name}
          </p>
          
          <div className="flex flex-col md:flex-row items-center md:items-baseline gap-1 md:gap-3 px-1">
            <span className="text-brand-red font-black text-lg">
              {product.outletPrice} Lei
            </span>
            <span className="text-gray-400 line-through text-xs font-medium">
              {product.originalPrice} Lei
            </span>
          </div>
        </div>
      </Link>

      {/* 2. Optional: Individual "Add to Cart" icon for instant action without navigating */}
      <button 
        onClick={(e) => {
          e.preventDefault(); // Prevents the Link from firing
          addItem(product); // Add the product to the cart
        }}
        className="absolute bottom-[85px] right-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-brand-gold hover:text-white"
        title="Add to Cart"
      >
        <ShoppingCart size={18} />
      </button>
    </div>
  );
}