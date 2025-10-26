import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import Header from "../components/Header";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image/:nasaId" element={<Detail />} />
        </Routes>
      </main>
    </div>
  );
}
