import { useParams, useNavigate } from "react-router-dom";
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
  background: white;
  max-width: 250px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 200px;
  object-fit: cover;
  border-radius: 8px;
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
  const { category } = useParams();
  const navigate = useNavigate();
  const decodedCategory = decodeURIComponent(category);

  const filteredProducts = popularProducts.filter(
    (product) => product.genre === decodedCategory
  );

  return (
    <Wrapper>
      <Title>Records in {decodedCategory}</Title>
      <Container>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
            >
              <Image src={product.img} alt={product.desc} />
              <Desc>{product.desc}</Desc>
              <Price>{product.price}</Price>
            </ProductCard>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </Container>
    </Wrapper>
  );
};

export default CatalogPage;
