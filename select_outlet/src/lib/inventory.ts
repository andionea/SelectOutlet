export async function getInventory(category?: string) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = "Products";

  // Use Airtable's "filterByFormula" to get specific categories
  let url = `https://api.airtable.com/v0/${baseId}/${table}`;
  
  if (category) {
    // This encodes the formula: {Category} = 'CategoryName'
    const filter = encodeURIComponent(`{Category} = '${category}'`);
    url += `?filterByFormula=${filter}`;
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return data.records.map((record: any) => ({
    id: record.id,
    name: record.fields.Name,
    brand: record.fields.Brand,
    originalPrice: record.fields.OriginalPrice,
    outletPrice: record.fields.OutletPrice,
    image: record.fields.ImageURL,
    category: record.fields.Category,
    isNew: record.fields.IsNew || false,
  }));
}