import React from "react";
import ImageCard from "./ImageCard";

export default function Gallery({ items }) {
  if (!items || items.length === 0) {
    return <div className="loading">No images found.</div>;
  }

  return (
    <div className="gallery-grid">
      {items.map((item) => {
        // item structure: { data: [{ ... }], links: [{href, rel}] }
        return <ImageCard key={item.data[0].nasa_id} item={item} />;
      })}
    </div>
  );
}
