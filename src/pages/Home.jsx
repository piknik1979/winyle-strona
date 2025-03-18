import React from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import BackToTop from "../components/BackToTop"; // Importowanie komponentu

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
      <BackToTop /> {/* Dodanie przycisku */}
    </div>
  );
};

export default Home;
