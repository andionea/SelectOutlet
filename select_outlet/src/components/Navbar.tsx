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
      {/* Announcement Bar */}
      <div className="bg-[#C5A059] text-white text-[10px] py-2 text-center uppercase tracking-[0.2em] font-bold">
        Vizitează-ne în magazinul fizic pentru oferte exclusive!
      </div>
      
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-black p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="hover:opacity-90 transition">
                <Image
                  src="/logo-select-outlet-1200x350px.png"
                  alt="Select Outlet"
                  width={240}
                  height={70}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - UPDATED LINKS */}
            <div className="hidden md:flex space-x-10 items-center">
              <Link
                href="/category/men"
                className="text-xs uppercase tracking-widest font-semibold text-gray-500 hover:text-brand-gold transition"
              >
                Bărbați
              </Link>
              <Link
                href="/category/women"
                className="text-xs uppercase tracking-widest font-semibold text-gray-500 hover:text-brand-gold transition"
              >
                Femei
              </Link>
              <Link
                href="/category/kids"
                className="text-xs uppercase tracking-widest font-semibold text-gray-500 hover:text-brand-gold transition"
              >
                Copii
              </Link>
              <Link
                href="/category/outlet"
                className="text-xs uppercase tracking-widest font-bold text-red-700"
              >
                Oferte
              </Link>
            </div>

            <div className="flex items-center space-x-5">
              <button className="hidden sm:block text-brand-black hover:text-brand-gold transition">
                <Search size={20} strokeWidth={1.5} />
              </button>
              
              <button onClick={onCartClick} className="relative group p-2">
                <ShoppingBag
                  size={22}
                  strokeWidth={1.5}
                  className="text-brand-black group-hover:text-brand-gold transition"
                />
                
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-0 -right-0 bg-[#C5A059] text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation - UPDATED LINKS */}
        {isOpen && (
          <div className="md:hidden bg-white absolute w-full border-b border-gray-100 py-6 px-6 space-y-6 flex flex-col items-center animate-in slide-in-from-top duration-300">
            <Link
              href="/category/men"
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-widest font-medium"
            >
              Bărbați
            </Link>
            <Link
              href="/category/women"
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-widest font-medium"
            >
              Femei
            </Link>
            <Link
              href="/category/kids"
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-widest font-medium"
            >
              Copii
            </Link>
            <Link
              href="/category/outlet"
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-widest font-bold text-red-700"
            >
              Oferte
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;