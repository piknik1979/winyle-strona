import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Products from "../components/Products";
import { mobile } from "../responsive";
import BackToTop from "../components/BackToTop";
import Announcement from "../components/Announcement"; // Importowanie Announcement

const Container = styled.div`
  padding: 20px;
  margin-top: 40px;
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

const ProductList = ({ searchTerm }) => {
  const [filteredProducts, setFilteredProducts] = useState(popularProducts);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    let products = [...popularProducts];

    // Filtrowanie po gatunku
    if (selectedGenre) {
      products = products.filter((product) => product.genre === selectedGenre);
    }

    // Filtrowanie po wyszukiwanym opisie
    if (searchTerm) {
      products = products.filter((product) =>
        product.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sortowanie alfabetyczne
    if (sortOrder === "asc") {
      products.sort((a, b) => a.desc.localeCompare(b.desc));
    } else {
      products.sort((a, b) => b.desc.localeCompare(a.desc));
    }

    setFilteredProducts(products);
  }, [selectedGenre, sortOrder, searchTerm]);

  return (
    <>
      <Announcement /> {/* Dodanie Announcement na górze */}
      <Container>
        <Title>Records</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter genre:</FilterText>
            <Select onChange={(e) => setSelectedGenre(e.target.value)}>
              <Option value="">All genres</Option>
              <Option value="Blues">Blues</Option>
              <Option value="Classic Rock">Classic Rock</Option>
              <Option value="Country">Country</Option>
              <Option value="Disco">Disco</Option>
              <Option value="Electronic">Electronic</Option>
              <Option value="Folk">Folk</Option>
              <Option value="Funk & Soul">Funk & Soul</Option>
              <Option value="Glam Rock">Glam Rock</Option>
              <Option value="Hard Rock">Hard Rock</Option>
              <Option value="Heavy Metal">Heavy Metal</Option>
              <Option value="Hip Hop">Rap</Option>
              <Option value="Indie Rock">Indie Rock</Option>
              <Option value="Jazz">Jazz</Option>
              <Option value="New Wave">New Wave</Option>
              <Option value="Pop">Pop</Option>
              <Option value="Pop Rock">Pop Rock</Option>
              <Option value="Prog Rock">Progressive Rock</Option>
              <Option value="Punk">Punk & Oi</Option>
              <Option value="Rock & Roll">Rock & Roll</Option>
              <Option value="Ska & Raggae">Ska & Reggae</Option>
              <Option value="Stage & Screen">Stage & Screen</Option>
              <Option value="Synth Pop">Synth Pop</Option>
              <Option value="Psychodelic Rock">Psychodelic Rock</Option>
            </Select>
          </Filter>

          <Filter>
            <FilterText>Sorting:</FilterText>
            <Select onChange={(e) => setSortOrder(e.target.value)}>
              <Option value="asc">A-Z</Option>
              <Option value="desc">Z-A</Option>
            </Select>
          </Filter>
        </FilterContainer>

        <Products products={filteredProducts} />
        <BackToTop />
      </Container>
    </>
  );
};

export default ProductList;
