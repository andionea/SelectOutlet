// Google Sheets API integration
import { Product } from "../types/product";

// Definim o interfață pentru datele brute așa cum vin din Google Sheet
interface GoogleSheetRecord {
  Nume: string;
  Brand: string;
  Categorie: string;
  Colectie: boolean;
  Descriere: string;
  Discount: boolean;
  ImageURL: string;
  IsNew: boolean;
  Marimi: string; // Notă: Acesta este un string în JSON, ex: "S, M, XL"
  Pret: number;
  Pret_Redus: number;
  Stoc: number;
}

export async function getInventory(categoryName?: string): Promise<Product[]> {
  const GOOGLE_SHEET_API_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;

  // TEMPORARY DEBUG: This will show up in Vercel "Logs" tab
  console.log("API URL check:", GOOGLE_SHEET_API_URL ? "Defined" : "UNDEFINED");

  // Verificare de siguranță
  if (!GOOGLE_SHEET_API_URL) {
    console.error("Eroare: NEXT_PUBLIC_GOOGLE_SHEET_API_URL nu este definit în .env.local");
    // Returnăm un array gol pentru a nu crăpa aplicația, dar logăm eroarea
    return [];
  }

  try {
    // 1. Preluăm TOATE datele de la API-ul Google Apps Script
    const res = await fetch(GOOGLE_SHEET_API_URL, {
      // Revalidăm datele la fiecare 60 de secunde pentru a păstra site-ul rapid
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Eroare la preluarea datelor din Google Sheets: ${res.status} ${res.statusText}`);
    }

    // Datele vin direct ca un array de obiecte
    const rawData: GoogleSheetRecord[] = await res.json();

    // 2. Transformăm datele brute în formatul nostru intern `Product`
    let products: Product[] = rawData.map((record, index) => {
      // Parsăm string-ul "Marimi" într-un array real.
      // Ex: "S, M, XL" devine ["S", "M", "XL"]
      const sizes = record.Marimi
        ? record.Marimi.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
        : [];

      // Generăm un ID unic bazat pe index și un nume simplificat
      const generatedId = `gs-${index}-${record.Nume ? record.Nume.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'produs'}`;

      return {
        id: generatedId,
        name: record.Nume || "Produs fără nume",
        brand: record.Brand || "",
        originalPrice: typeof record.Pret === 'number' ? record.Pret : 0,
        // Folosim Pret_Redus ca preț final. Dacă lipsește, folosim prețul original.
        outletPrice: typeof record.Pret_Redus === 'number' ? record.Pret_Redus : (record.Pret || 0),
        image: record.ImageURL || "", // Poți adăuga o imagine placeholder aici dacă dorești
        category: record.Categorie || "Neclasificat",
        description: record.Descriere || "",
        sizes: sizes,
        isNew: record.IsNew === true, // Ne asigurăm că este boolean
        hasDiscount: record.Discount === true, // Ne asigurăm că este boolean
        stock: typeof record.Stoc === 'number' ? record.Stoc : 0,
        collection: record.Colectie === true,
      };
    });

    // 3. Implementăm filtrarea în aplicație (client-side filtering)
    if (categoryName) {
      if (categoryName === 'Outlet') {
        // Pentru pagina "Oferte", filtrăm produsele care au `hasDiscount: true`
        products = products.filter((p) => p.hasDiscount);
      } else {
        // Pentru celelalte categorii, filtrăm după numele exact al categoriei (ex: "Femei")
        products = products.filter((p) => p.category === categoryName);
      }
    }

    return products;

  } catch (error) {
    console.error("A apărut o eroare în getInventory:", error);
    // Returnăm un array gol în caz de eroare majoră pentru a menține site-ul funcțional
    return [];
  }
}

// Airtable API integration
/*
export async function getInventory(categoryName?: string) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = "Products";

  let url = `https://api.airtable.com/v0/${baseId}/${table}`;
  
  if (categoryName === 'Outlet') {
    // If we want "Oferte", we filter by the 'Discount' checkbox being checked (1)
    const filter = encodeURIComponent(`{Discount} = 1`);
    url += `?filterByFormula=${filter}`;
  } else if (categoryName) {
    // Otherwise, filter by the specific category name
    const filter = encodeURIComponent(`{Categorie} = '${categoryName}'`);
    url += `?filterByFormula=${filter}`;
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return data.records.map((record: any) => ({
    id: record.id,
    name: record.fields.Nume || record.fields.Name || "Produs",
    brand: record.fields.Brand || "",
    originalPrice: record.fields.Pret || record.fields.Price || 0,
    outletPrice: record.fields.Pret_Redus || record.fields.Pret || 0,
    image: record.fields.ImageURL || "",
    category: record.fields.Categorie || record.fields.Category || "",
    isNew: record.fields.IsNew || false,
    hasDiscount: record.fields.Discount || false,
  }));
}*/