import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAsset, searchImages } from "../api/nasa";

export default function Detail() {
  const { nasaId } = useParams();
  const [dataItem, setDataItem] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        // The asset endpoint returns array of image URLs; but we also need metadata (title/description).
        // We'll attempt to fetch the asset, and also do a search by nasa_id to get metadata.
        const [assetRes, metaRes] = await Promise.allSettled([
          fetchAsset(nasaId),
          searchImages(nasaId, 1)
        ]);

        if (cancelled) return;

        if (assetRes.status === "fulfilled") {
          const items = assetRes.value.items || [];
          setAssets(items.map(i => i.href).filter(Boolean));
        } else {
          setAssets([]);
        }

        if (metaRes.status === "fulfilled") {
          const metaItems = metaRes.value.items || [];
          if (metaItems.length) setDataItem(metaItems[0].data[0]);
        }

      } catch (err) {
        console.error(err);
        setError("Failed to load image details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [nasaId]);

  async function downloadImage(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = (dataItem && dataItem.title ? dataItem.title.replace(/\s+/g, "_") : "nasa_image") + ".jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      alert("Could not download image.");
    }
  }

  return (
    <div className="container">
      <div style={{ marginBottom: 12 }}>
        <Link to="/" className="btn">Close</Link>
      </div>

      {loading ? <div className="loading">Loading details...</div> : error ? <div className="error">{error}</div> : (
        <div className="detail">
          <div>
            {assets && assets.length ? (
              <img src={assets[assets.length - 1]} alt={dataItem?.title} />
            ) : (
              <div style={{ height: 420, borderRadius: 12, background: "linear-gradient(180deg,#071223,#03060a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: "var(--muted)" }}>No preview image available.</div>
              </div>
            )}
          </div>

          <div className="panel">
            <h2 style={{ marginTop: 0 }}>{dataItem?.title || "Untitled"}</h2>
            <div style={{ color: "var(--muted)", marginBottom: 12 }}>{dataItem?.center || dataItem?.photographer || "NASA"}</div>
            <div style={{ marginBottom: 12 }}>{dataItem?.description || "No description available."}</div>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {assets && assets.length > 0 && (
                <button className="btn primary" onClick={() => downloadImage(assets[assets.length - 1])}>Download</button>
              )}
            </div>

            <div style={{ marginTop: 14, color: "var(--muted)" }}>
              <div><strong>Date:</strong> {dataItem?.date_created ? new Date(dataItem.date_created).toLocaleString() : "Unknown"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
