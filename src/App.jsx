import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";  // Import strony szczegółów produktu

const Layout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/"; // Navbar nie będzie widoczny na Home

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} /> {/* Nowa trasa dla produktu */}
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
