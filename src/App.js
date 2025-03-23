import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import CatalogPage from "./pages/CatalogPage";
import Announcement from "./components/Announcement"; // Import Announcement
import { useState } from "react";
import { Helmet } from "react-helmet-async"; // Import React Helmet

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <>
      {/* Dodanie tagu Google Analytics do nagłówka */}
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
      
      <Announcement /> {/* Teraz zawsze jest na górze */}
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

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
