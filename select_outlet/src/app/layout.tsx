"use client";
import { useState } from 'react';
import CartDrawer from '../components/CartDrawer';
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; 
import Footer from '../components/Footer';

const geistSans = Geist({
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <html lang="ro">
      <body className="antialiased bg-white text-black">
        {/* Replace the throw new Error with the actual state setter */}
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
        
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </body>
    </html>
  );
}