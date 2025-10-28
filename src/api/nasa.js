const BASE = "https://images-api.nasa.gov";

export async function searchImages(q = "galaxy", page = 1) {
  const url = `${BASE}/search?q=${encodeURIComponent(q)}&media_type=image&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Search request failed");
  const json = await res.json();
  return json.collection || { items: [], metadata: {} };
}

export async function fetchAsset(nasaId) {
  const url = `${BASE}/asset/${encodeURIComponent(nasaId)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Asset request failed");
  const json = await res.json();
  return json.collection || { items: [] };
}