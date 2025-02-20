import React, { createContext, useContext, useState } from "react";

// Tworzymy kontekst
const SearchContext = createContext();

// Hook do używania kontekstu
export const useSearch = () => useContext(SearchContext);

// Komponent provider
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Stan do trzymania zapytania

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
