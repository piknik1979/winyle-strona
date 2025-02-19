import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Products from "../components/Products";
import { mobile } from "../responsive";
import BackToTop from "../components/BackToTop";

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

const Option = styled.option``;  // <==== DODAŁEM TO

// const Button = styled.button`
//   padding: 10px;
//   background-color: red;
//   color: white;
//   border: none;
//   cursor: pointer;
//   font-weight: bold;
//   border-radius: 5px;
//   margin-left: 20px;
// `;

const ProductList = ({ searchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState(popularProducts);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    let products = [...popularProducts];

    if (selectedGenre) {
      products = products.filter((product) => product.genre === selectedGenre);
    }

    if (searchQuery) {
      products = products.filter((product) =>
        product.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      products.sort((a, b) => a.desc.localeCompare(b.desc));
    } else {
      products.sort((a, b) => b.desc.localeCompare(a.desc));
    }

    setFilteredProducts(products);
  }, [selectedGenre, sortOrder, searchQuery]);

  // const resetFilters = () => {
  //   setSelectedGenre("");
  //   setSortOrder("asc");
  //   setFilteredProducts(popularProducts);
  // };

  return (
    <Container>
      <Title>Records</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter genre:</FilterText>
          <Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <Option value="">All genres</Option>
            <Option value="Blues">Blues</Option>
            <Option value="Classic Rock">Classic Rock</Option>
            <Option value="Country">Country</Option>
            <Option value="Electronic">Electronic</Option>
            <Option value="Jazz">Jazz</Option>
            <Option value="Punk">Punk & Oi</Option>
            <Option value="Pop Rock">Pop Rock</Option>
            <Option value="Rock & Roll">Rock & Roll</Option>
            <Option value="Synth Pop">Synth Pop</Option>
          </Select>
        </Filter>

        <Filter>
          <FilterText>Sorting:</FilterText>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <Option value="asc">A-Z</Option>
            <Option value="desc">Z-A</Option>
          </Select>
        </Filter>

        {/* <Button onClick={resetFilters}>Reset Filters</Button> */}
      </FilterContainer>

      <Products products={filteredProducts} />
      <BackToTop />
    </Container>
  );
};

export default ProductList;
