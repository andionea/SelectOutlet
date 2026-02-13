"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "../lib/store";

const Navbar = ({ onCartClick }: { onCartClick: () => void }) => {
  const items = useCart((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* 1. Announcement Bar - Ultra-compactă */}
      <div className="bg-[#C5A059] text-white text-[10px] py-1.5 text-center uppercase tracking-[0.2em] font-bold">
        Vizitează-ne în magazinul fizic pentru oferte exclusive!
      </div>
      
      {/* 2. Main Navbar - Înălțime fixă (64px pe mobil, 80px pe desktop) */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black p-2"
              >
                {isOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
              </button>
            </div>

            {/* Logo - Aproape la fel de înalt ca navbar-ul pentru impact maxim */}
            <div className="flex-shrink-0 flex items-center h-full py-1"> 
              <Link href="/" className="hover:opacity-90 transition-opacity h-full flex items-center">
                <Image
                  src="/logo-select-outlet-1200x350px.png"
                  alt="Select Outlet"
                  width={280} 
                  height={80}
                  priority
                  className="w-auto h-14 md:h-18 object-contain" 
                />
              </Link>
            </div>

            {/* Desktop Navigation - Text mare (14px) Bold */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                href="/category/men"
                className="text-[14px] uppercase tracking-[0.1em] font-bold text-black hover:text-[#C5A059] transition-colors"
              >
                Barbati
              </Link>
              <Link
                href="/category/women"
                className="text-[14px] uppercase tracking-[0.1em] font-bold text-black hover:text-[#C5A059] transition-colors"
              >
                Femei
              </Link>
              <Link
                href="/category/kids"
                className="text-[14px] uppercase tracking-[0.1em] font-bold text-black hover:text-[#C5A059] transition-colors"
              >
                Copii
              </Link>
              <Link
                href="/category/accesorii"
                className="text-[14px] uppercase tracking-[0.1em] font-bold text-black hover:text-[#C5A059] transition-colors"
              >
                Accesorii
              </Link>
              <Link
                href="/category/outlet"
                className="text-[14px] uppercase tracking-[0.1em] font-black text-red-700 hover:text-red-800 transition-colors"
              >
                Oferte
              </Link>
            </div>

            {/* Iconițe Negre cu contrast ridicat */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <button className="hidden sm:block text-black hover:text-[#C5A059] transition-colors">
                <Search size={22} strokeWidth={2.5} />
              </button>
              
              <button onClick={onCartClick} className="relative group p-2">
                <ShoppingBag
                  size={24}
                  strokeWidth={2.5}
                  className="text-black group-hover:text-[#C5A059] transition-colors"
                />
                
                {mounted && itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#C5A059] text-white text-[9px] font-black h-4.5 w-4.5 rounded-full flex items-center justify-center shadow-sm">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden bg-white absolute w-full border-b border-gray-100 py-8 px-6 space-y-6 flex flex-col items-center animate-in slide-in-from-top duration-300 shadow-xl">
            <Link href="/category/men" onClick={() => setIsOpen(false)} className="text-base uppercase tracking-widest font-bold text-black">Bărbați</Link>
            <Link href="/category/women" onClick={() => setIsOpen(false)} className="text-base uppercase tracking-widest font-bold text-black">Femei</Link>
            <Link href="/category/kids" onClick={() => setIsOpen(false)} className="text-base uppercase tracking-widest font-bold text-black">Copii</Link>
            <Link href="/category/accesorii" onClick={() => setIsOpen(false)} className="text-base uppercase tracking-widest font-bold text-black">Accesorii</Link>
            <Link href="/category/outlet" onClick={() => setIsOpen(false)} className="text-base uppercase tracking-widest font-black text-red-700">Oferte</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;