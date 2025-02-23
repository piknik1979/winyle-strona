import styled from "styled-components";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 40px;
  display: flex;
  margin-top: 60px;  
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 750px;
  max-height: 750px;
  ${mobile({ width: "100%", maxWidth: "100%", maxHeight: "100%" })}
`;

const Image = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 8px;
`;

const BackButton = styled.button`
  margin-top: 20px; 
  margin-bottom: 25px; 
  padding: 7px 15px;  
  font-size: 12px; 
  border: 2px solid black;
  background-color: white;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const Details = styled.div`
  margin: 20px 0;
  font-size: 18px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

// const AmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   font-weight: 700;
// `;

// const Amount = styled.span`
//   width: 30px;
//   height: 30px;
//   border-radius: 10px;
//   border: 1px solid teal;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0px 5px;
// `;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <p>PRODUCT NOT FOUND</p>;

  const handleAddToCartClick = () => {
    window.location.href = product.cart;
  };

  return (
    <Container>
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} alt={product.desc} />
          <BackButton onClick={() => navigate("/catalog")}>← Back to Records</BackButton>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.desc}</Title>
          <Details>
            <p><strong>Genre:</strong> {product.genre}</p>
            <p><strong>Media rating:</strong> {product.media}</p>
            <p><strong>Sleeve rating:</strong> {product.sleeve}</p>
          </Details>
          <Price>{product.price}</Price>
          <AddContainer>
            {/* <AmountContainer>
              <Amount>1</Amount>
            </AmountContainer> */}
            <Button onClick={handleAddToCartClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
