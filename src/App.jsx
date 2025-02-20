import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import { useState } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar onSearch={setSearchTerm} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<ProductList searchTerm={searchTerm} />} />
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
