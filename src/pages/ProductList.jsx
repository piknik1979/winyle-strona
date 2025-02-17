import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data"; // Importujemy dane
import Products from "../components/Products"; // Importujemy komponent Products
import { mobile } from "../responsive"; // Style mobilne
import BackToTop from "../components/BackToTop"; // Importuj komponent BackToTop

const Container = styled.div`
  padding: 20px;
  margin-top: 100px;  /* Zwiększ margines górny, aby oddzielić filtr od produktów */
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;  /* Oddziela filtr od produktów */
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

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(popularProducts);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Domyślny porządek sortowania: A-Z

  // Obsługa filtrowania
  useEffect(() => {
    let products = [...popularProducts];

    // Filtrowanie po gatunku
    if (selectedGenre) {
      products = products.filter((product) => product.genre === selectedGenre);
    }

    // Sortowanie alfabetyczne
    if (sortOrder === "asc") {
      products.sort((a, b) => a.desc.localeCompare(b.desc)); // A-Z
    } else {
      products.sort((a, b) => b.desc.localeCompare(a.desc)); // Z-A
    }

    setFilteredProducts(products);
  }, [selectedGenre, sortOrder]); // Efekt uruchamia się, gdy zmienia się gatunek lub porządek sortowania

  return (
    <Container>
      <Title>Albumy</Title>
      <FilterContainer>
        {/* Filtrowanie według gatunku */}
        <Filter>
          <FilterText>Filter genre:</FilterText>
          <Select onChange={(e) => setSelectedGenre(e.target.value)}>
            <Option value="">All genres</Option>
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

        {/* Sortowanie według nazwy alfabetycznie */}
        <Filter>
          <FilterText>Sorting:</FilterText>
          <Select onChange={(e) => setSortOrder(e.target.value)}>
            <Option value="asc">A-Z</Option>
            <Option value="desc">Z-A</Option>
          </Select>
        </Filter>
      </FilterContainer>

      {/* Wyświetlanie przefiltrowanych produktów */}
      <Products products={filteredProducts} />

      {/* Dodaj przycisk 'Back to Top' */}
      <BackToTop />
    </Container>
  );
};

export default ProductList;
