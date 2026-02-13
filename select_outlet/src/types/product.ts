export interface Product {
  id: string;
  name: string;
  brand: string;
  originalPrice: number;
  outletPrice: number;
  image: string;
  category: string;
  description?: string;
  sizes: string[];      // From your 'Marimi' multiple select
  isNew: boolean;
  hasDiscount: boolean; // From your 'Discount' checkbox
  stock: number;
}