const BASE = "https://images-api.nasa.gov";

/**
 * Search images
 * @param {string} q search query
 * @param {number} page 1-based page number
 */
export async function searchImages(q = "galaxy", page = 1) {
  const url = `${BASE}/search?q=${encodeURIComponent(q)}&media_type=image&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Search request failed");
  const json = await res.json();
  return json.collection || { items: [], metadata: {} };
}

/**
 * Get asset list for a nasa_id to find original images
 * @param {string} nasaId
 */
export async function fetchAsset(nasaId) {
  const url = `${BASE}/asset/${encodeURIComponent(nasaId)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Asset request failed");
  const json = await res.json();
  return json.collection || { items: [] };
}
