import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import CatalogPage from "./pages/CatalogPage";
import Announcement from "./components/Announcement";
import { supabase } from "./supabaseClient"; // <-- DODANE: Importujemy nasze połączenie z Supabase
import Auth from "./Auth"; // <-- DODANE: Importujemy komponent logowania

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [session, setSession] = useState(null); // <-- DODANE: Stan przechowujący sesję zalogowanego użytkownika
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  useEffect(() => {
    if (typeof window !== "undefined" && window.document) {
      console.log("Helmet is working");
    }

    // <-- DODANE: Sprawdzamy, czy użytkownik już jest zalogowany w przeglądarce
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // <-- DODANE: Nasłuchujemy na żywo zmian (zalogowanie / wylogowanie)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
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

      <Announcement />
      {/* ZMIENIONE: Przekazujemy 'session' do Navbaru, żeby wiedział czy pokazać "Zaloguj" czy "Wyloguj" */}
      {showNavbar && <Navbar onSearch={setSearchTerm} session={session} />} 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<ProductList searchTerm={searchTerm} />} />
        <Route path="/catalog/:category" element={<CatalogPage />} />
        
        {/* ZMIENIONE: Przekazujemy sesję do strony produktu (przyda się do przycisku "Kup") */}
        <Route path="/product/:id" element={<Product session={session} />} /> 
        
        {/* DODANE: Nowa ścieżka do ekranu logowania */}
        <Route path="/login" element={<Auth />} /> 
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <HelmetProvider>
    <Router>
      <App />
    </Router>
  </HelmetProvider>
);

export default AppWrapper;