"use client";

import Image from 'next/image';
import { ShoppingBag, ChevronRight, Heart, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/src/lib/store'; // Adjust this path if your store is elsewhere

// Mock data - in a real scenario, you'd fetch this based on the [id]
const productData = {
  id: "4",
  name: "Classic Elegant Evening Dress",
  brand: "Gia Collection",
  originalPrice: 899,
  outletPrice: 499,
  description: "A stunning floor-length evening gown crafted from premium velvet. Features a subtle side slit and elegant draping, perfect for high-end events and gala dinners.",
  sizes: ["XS", "S", "M", "L", "XL"],
  image: "https://res.cloudinary.com/dff92deol/image/upload/v1770562611/Bluza-fete-CA-00633_vikcub.jpg",
  category: "Women",
  isNew: true,
  hasDiscount: false,
  stock: 5
};

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    // We pass the product object to our Zustand store
    addItem(productData);
    
    // Trigger a brief success animation
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const savePercentage = Math.round((100 - (productData.outletPrice / productData.originalPrice * 100)));

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumbs - High-end style */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
        <span className="hover:text-black cursor-pointer">Home</span> 
        <ChevronRight size={10} /> 
        <span className="hover:text-black cursor-pointer">{productData.category}</span> 
        <ChevronRight size={10} /> 
        <span className="text-black font-bold">{productData.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">
        
        {/* Left: Premium Image Gallery */}
        <div className="relative aspect-[2/3] bg-brand-gray overflow-hidden group">
          <Image 
            src={productData.image} 
            alt={productData.name} 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          {/* Sale Badge Overlay */}
          <div className="absolute top-6 left-6 bg-brand-red text-white text-xs font-black px-4 py-2 uppercase tracking-tighter shadow-xl">
            -{savePercentage}% OFF
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="flex flex-col space-y-10 py-4">
          <div className="space-y-2">
            <span className="text-brand-gold font-bold tracking-[0.3em] text-[10px] uppercase">
              {productData.brand}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-brand-black leading-tight">
              {productData.name}
            </h1>
            
            <div className="flex items-center gap-6 pt-4">
              <span className="text-4xl font-black text-brand-red tracking-tighter">
                {productData.outletPrice} Lei
              </span>
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 line-through font-medium">
                  {productData.originalPrice} Lei
                </span>
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">
                  Economisești {productData.originalPrice - productData.outletPrice} Lei
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-8">
            {productData.description}
          </p>

          {/* Size Selection - Inspired by luxury brands */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-black">Mărime: {selectedSize}</span>
              <button className="text-[10px] underline uppercase tracking-widest text-gray-400 hover:text-brand-gold transition-colors">Ghid Mărimi</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 flex items-center justify-center border text-[11px] font-bold transition-all duration-300 ${
                    selectedSize === size 
                    ? "border-brand-black bg-brand-black text-white shadow-lg" 
                    : "border-gray-200 text-gray-400 hover:border-brand-gold hover:text-brand-gold"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="flex flex-col gap-4 pt-4">
            <button 
              onClick={handleAddToCart}
              className={`w-full py-5 flex items-center justify-center gap-3 uppercase font-bold tracking-[0.2em] text-xs transition-all duration-500 shadow-xl ${
                addedToCart 
                ? "bg-green-600 text-white" 
                : "bg-brand-black text-white hover:bg-brand-gold"
              }`}
            >
              {addedToCart ? (
                <> <CheckCircle2 size={18} /> Adăugat în Coș </>
              ) : (
                <> <ShoppingBag size={18} /> Adaugă în Coș </>
              )}
            </button>
            
            <button className="w-full border border-gray-200 py-5 flex items-center justify-center gap-3 uppercase font-bold tracking-[0.2em] text-[10px] hover:bg-gray-50 transition-all text-gray-500">
              <Heart size={16} /> Salvează la Favorite
            </button>
          </div>

          {/* Outlet Info - Trust Signal */}
          <div className="bg-brand-gray p-8 border border-gray-100 rounded-sm space-y-2">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Disponibilitate Outlet</p>
            <p className="text-xs text-brand-black font-medium leading-relaxed">
              Acest produs este disponibil pentru **ridicare imediată** din magazinul nostru local sau pentru livrare în 24-48 ore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}