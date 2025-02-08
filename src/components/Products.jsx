import React from "react";
import styled from "styled-components";
import Product from "./Product"; // Import komponentu pojedynczego produktu

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Dynamiczne tworzenie kolumn */
  gap: 20px;
  margin-top: 20px;  /* Oddzielamy produkty od filtrów */
`;

const Products = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>No products available.</div>; // Komunikat, jeśli brak produktów
  }

  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
