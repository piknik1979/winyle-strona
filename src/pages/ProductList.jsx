import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data"; // Importujemy dane
import Products from "../components/Products"; // Importujemy komponent Products
import { mobile } from "../responsive"; // Style mobilne

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
            <Option value="BLUES">Blues</Option>
            <Option value="POPROCK">Poprock</Option>
            <Option value="STAGE & SCREEN">Stage and Screen</Option>
            <Option value="ELECTRONIC">Electronic</Option>
            <Option value="JAZZ">Jazz</Option>
            <Option value="PUNK & OI">Punk & Oi</Option>
            <Option value="CLASSIC ROCK">Classic Rock</Option>
            <Option value="COUNTRY">Country</Option>
          </Select>
        </Filter>
      </FilterContainer>

      {/* Wyświetlanie przefiltrowanych produktów */}
      <Products products={filteredProducts} />
    </Container>
  );
};

export default ProductList;
