import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";  // Dodaj useState!
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";

const Layout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  const [searchQuery, setSearchQuery] = useState(""); // Dodaj stan wyszukiwania

  return (
    <>
      {showNavbar && <Navbar setSearchQuery={setSearchQuery} />}  {/* Przekazujemy setSearchQuery */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<ProductList searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
