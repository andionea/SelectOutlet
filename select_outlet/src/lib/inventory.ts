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
}