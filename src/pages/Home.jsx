import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import useDebounce from "../hooks/useDebounce";
import { searchImages } from "../api/nasa";
import Gallery from "../components/Gallery";

export default function Home() {
  const { query, page, setPage } = useAppContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalHits, setTotalHits] = useState(0);

  const debouncedQuery = useDebounce(query || "galaxy", 500);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await searchImages(debouncedQuery || "galaxy", page || 1);
        if (cancelled) return;
        const items = data.items || [];
        setItems(items);
        setTotalHits((data.metadata && data.metadata.total_hits) || items.length);
      } catch (err) {
        console.error(err);
        setError("Could not load images. Try again.");
        setItems([]);
        setTotalHits(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [debouncedQuery, page]);

  function nextPage() {
    setPage((p) => (p || 1) + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function prevPage() {
    setPage((p) => Math.max(1, (p || 1) - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      {loading ? <div className="loading">Loading images...</div> : <Gallery items={items} />}

      <div className="pagination">
        <button className="btn" onClick={prevPage} disabled={page <= 1}>Previous</button>
        <div style={{ alignSelf: "center", padding: "0 0.6rem", color: "var(--muted)" }}>Page {page}</div>
        <button className="btn" onClick={nextPage} disabled={items.length === 0}>Next</button>
      </div>

      <div className="footer-note">Showing {items.length} items • approx {totalHits} total results</div>
    </div>
  );
}
