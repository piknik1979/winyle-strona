import { useParams } from "react-router-dom";
import styled from "styled-components";
import { popularProducts } from "../data";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1200px) { 
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) { 
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
  }
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 200px;
  object-fit: cover;
`;

const Desc = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

const Price = styled.span`
  font-weight: bold;
  color: #000;
`;

const CatalogPage = () => {
  const { category } = useParams(); // Pobieramy kategorię z URL
  const filteredProducts = popularProducts.filter((product) => product.genre === category); // Filtrowanie produktów

  return (
    <Wrapper>
      <Title>Records in {category}</Title>
      <Container>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <Image src={product.img} alt={product.desc} />
            <Desc>{product.desc}</Desc>
            <Price>{product.price}</Price>
          </ProductCard>
        ))}
      </Container>
    </Wrapper>
  );
};

export default CatalogPage;
