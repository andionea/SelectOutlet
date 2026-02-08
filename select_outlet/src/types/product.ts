export interface Product {
  id: string;
  name: string;
  brand: string;
  originalPrice: number;
  outletPrice: number;
  image: string;
  category: string;
  isNew?: boolean;
}