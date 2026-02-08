import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; // Added for the cart drawer
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },

      removeItem: (id) => set({ 
        items: get().items.filter((i) => i.id !== id) 
      }),

      // New helper to let users increase/decrease quantity in the drawer
      updateQuantity: (id, quantity) => set({
        items: get().items.map((item) => 
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      }),

      clearCart: () => set({ items: [] }),

      totalPrice: () => {
        const total = get().items.reduce(
          (acc, item) => acc + item.outletPrice * item.quantity, 
          0
        );
        return Math.round(total); // Keeps prices clean for Lei
      },
    }),
    { name: 'cart-storage' }
  )
);