import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async"; // Importujemy HelmetProvider i Helmet
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import CatalogPage from "./pages/CatalogPage";
import Announcement from "./components/Announcement"; // Import Announcement

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  useEffect(() => {
    // Upewnij się, że React Helmet jest poprawnie zainicjowany
    if (typeof window !== "undefined" && window.document) {
      console.log("Helmet is working");
    }
  }, []);

  return (
    <>
      {/* Dodanie tagu Google Analytics */}
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7W97HTKLSG"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7W97HTKLSG');
          `}
        </script>
      </Helmet>

      <Announcement /> {/* Zawsze na górze */}
      {showNavbar && <Navbar onSearch={setSearchTerm} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<ProductList searchTerm={searchTerm} />} />
        <Route path="/catalog/:category" element={<CatalogPage />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </>
  );
};

// Opakowujemy Router w HelmetProvider
const AppWrapper = () => (
  <HelmetProvider>
    <Router>
      <App />
    </Router>
  </HelmetProvider>
);

export default AppWrapper;
