import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Header() {
  const { query, setQuery, setPage } = useAppContext();

  function onSearch(e) {
    setPage(1);
    setQuery(e.target.value);
  }

  return (
    <header className="header">
      <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
        <div className="app-title">
          <span style={{fontSize: 40}}> NASA Image Explorer</span>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div className="searchbar">
          <input
            aria-label="Search images"
            placeholder="Search NASA images"
            value={query}
            onChange={onSearch}
          />
        </div>
      </div>
    </header>
  );
}
