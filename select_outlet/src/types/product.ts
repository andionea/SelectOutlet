// Google Sheets Product Type Definition
export interface Product {
  id: string; // Vom genera acest ID în cod
  name: string;
  brand: string;
  originalPrice: number;
  outletPrice: number;
  image: string;
  category: string;
  description: string;
  sizes: string[]; // Acum este un array de string-uri
  isNew: boolean;
  hasDiscount: boolean;
  stock: number;
  //collection: boolean; // Câmp nou prezent în JSON
}

// Airtable Product Type Definition
/*
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
*/