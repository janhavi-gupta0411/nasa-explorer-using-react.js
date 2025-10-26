import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  return (
    <AppContext.Provider value={{ query, setQuery, page, setPage }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
