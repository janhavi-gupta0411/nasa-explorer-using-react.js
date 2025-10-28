import React from "react";
import { Link } from "react-router-dom";

function getThumbnail(item) {
  if (item.links && item.links.length) {
    const l = item.links.find((x) => x.render === "image" || x.rel === "preview") || item.links[0];
    if (l && l.href) return l.href;
  }
  return "";
}

export default function ImageCard({ item }) {
  const data = item.data && item.data[0] ? item.data[0] : {};
  const thumb = getThumbnail(item);
  const nasaId = data.nasa_id;

  return (
    <div className="card" title={data.title}>
      <div className="card-inner">
        <div className="card-front">
          <img src={thumb} alt={data.title} loading="lazy" />
          <div className="meta">
            <div className="meta-title">{data.title}</div>
            <div className="meta-sub">{data.date_created ? new Date(data.date_created).toLocaleDateString() : ""}</div>
          </div>
        </div>

        <div className="card-back">
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>{data.title}</div>
            <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 13 }}>
              {data.center || data.photographer || "NASA"}
            </div>
            <div style={{ marginTop: 8, color: "var(--muted)", fontSize: 13 }}>
              {data.description ? (data.description.length > 120 ? data.description + "..." : data.description) : "No description."}
            </div>
          </div>

          <div style={{ marginTop: 8, width: "100%", display: "flex", gap: 8 }}>
            <Link to={`/image/${encodeURIComponent(nasaId)}`} className="btn primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
