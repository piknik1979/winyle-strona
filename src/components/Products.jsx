import styled from "styled-components";
import Product from "./Product";
import { popularProducts } from "../data"; // Zakładamy, że dane są w pliku data.js

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  return (
    <Container>
      {popularProducts.map((item) => (
        <div key={item.id} style={{ textAlign: "center", marginBottom: "20px" }}>
          {/* Link otaczający cały produkt */}
          <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Product item={item} />
          </a>
        </div>
      ))}
    </Container>
  );
};

export default Products;
