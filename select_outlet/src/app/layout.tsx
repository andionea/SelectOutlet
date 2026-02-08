"use client";
import { useState } from 'react';
import CartDrawer from '../components/CartDrawer';
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // Adjusted path for your structure

const geistSans = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <html lang="ro">
      <body className={`${geistSans.className} antialiased bg-white text-black`}>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main>{children}</main>
        
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </body>
    </html>
  );
}