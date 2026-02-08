"use client";
import { useCart } from '@/src/lib/store';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer Content */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase tracking-widest">Coșul tău ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag size={48} className="text-gray-200" />
              <p className="text-gray-500 uppercase text-xs tracking-widest font-bold">Coșul este gol</p>
              <button onClick={onClose} className="bg-brand-black text-white px-8 py-3 text-xs uppercase font-bold tracking-widest">
                Începe cumpărăturile
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-6">
                <div className="relative h-24 w-20 bg-gray-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-tight">{item.name}</h3>
                    <p className="text-[10px] text-brand-gold font-bold uppercase">{item.brand}</p>
                    <p className="text-sm font-black text-brand-red mt-1">{item.outletPrice} Lei</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Cantitate: {item.quantity}</span>
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-brand-red transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-brand-gray space-y-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Total</span>
              <span className="text-2xl font-black">{totalPrice()} Lei</span>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Taxele și livrarea calculate la finalizare.</p>
            <button className="w-full bg-brand-black text-white py-5 text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-all shadow-xl">
              Finalizare Comandă
            </button>
          </div>
        )}
      </div>
    </div>
  );
}