import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data"; // Importujemy dane
import Products from "../components/Products"; // Importujemy komponent Products
import { mobile } from "../responsive"; // Style mobilne
import winylImage from "../assets/winyl.png"; // Załaduj obrazek

const Container = styled.div`
  padding: 20px;
  margin-top: 100px;
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  ${mobile({ flexDirection: "column", alignItems: "flex-start" })}
`;

const Filter = styled.div`
  margin: 10px;
  ${mobile({ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

// Dodaj przycisk "Back to Top"
const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="back-to-top"
      onClick={scrollToTop}
      style={styles.backToTop}
    >
      <div style={styles.backToTopText}>DO GÓRY</div> {/* Tekst w przycisku */}
    </div>
  );
};

// Definicja stylów
const styles = {
  backToTop: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "80px",
    height: "80px",
    backgroundImage: `url(${winylImage})`, // Ustawienie tła na obrazek
    backgroundSize: "cover", // Dopasowanie obrazu do rozmiaru przycisku
    backgroundPosition: "center", // Wyśrodkowanie obrazu
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 10, // Wysoki z-index, żeby przycisk był na wierzchu
    transition: "all 0.3s ease", // Dodanie animacji przycisku
  },
  backToTopText: {
    color: "#d9e0de", // Zmieniony kolor na ciemnoszary
    fontSize: "14px",
    textAlign: "center",
    fontWeight: "bold",
    transform: "rotate(-45deg)", // Rotacja tekstu
    position: "absolute", // Aby tekst był wyśrodkowany na obrazie
    zIndex: 1, // Ustawienie, aby tekst był na wierzchu
  },
};

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(popularProducts);
  const [selectedGenre, setSelectedGenre] = useState("");

  // Obsługa filtrowania
  useEffect(() => {
    let products = [...popularProducts];

    if (selectedGenre) {
      products = products.filter((product) => product.genre === selectedGenre);
    }

    setFilteredProducts(products);
  }, [selectedGenre]);

  return (
    <Container>
      <Title>Albumy</Title>
      <FilterContainer>
        {/* Filtrowanie według gatunku */}
        <Filter>
          <FilterText>Filtruj według gatunku:</FilterText>
          <Select onChange={(e) => setSelectedGenre(e.target.value)}>
            <Option value="">Wszystkie</Option>
            <Option value="Blues">Blues</Option>
            <Option value="Classic Rock">Classic Rock</Option>
            <Option value="Country">Country</Option>
            <Option value="Electronic">Electronic</Option>
            <Option value="Jazz">Jazz</Option>
            <Option value="Punk">Punk & Oi</Option>
            <Option value="Pop Rock">Pop Rock</Option>
            <Option value="Rock & Roll">Rock & Roll</Option>
            <Option value="Stage & Screen">Stage & Screen</Option>
            <Option value="Synth Pop">Synth Pop</Option>
            <Option value="Funk & Soul">Funk & Soul</Option>
            <Option value="Hard Rock">Hard Rock</Option>
            <Option value="Disco">Disco</Option>
            <Option value="Ska & Raggae">Ska & Reggae</Option>
            <Option value="Psychodelic Rock">Psychodelic Rock</Option>
            <Option value="Folk">Folk</Option>
            <Option value="Glam Rock">Glam Rock</Option>
            <Option value="Heavy Metal">Heavy Metal</Option>
          </Select>
        </Filter>
      </FilterContainer>

      {/* Wyświetlanie przefiltrowanych produktów */}
      <Products products={filteredProducts} />

      {/* Przycisk "Back to Top" */}
      <BackToTop />
    </Container>
  );
};

export default ProductList;
