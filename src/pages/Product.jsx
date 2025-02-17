import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom"; // Import useLocation z react-router-dom
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive"; // Responsywne style

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
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

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

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
  const product = location.state?.product;

  if (!product) return <p>PRODUCT NOT FOUND</p>;

  // Funkcja obsługująca kliknięcie "Add to Cart"
  const handleAddToCartClick = () => {
    window.location.href = product.card; // Przekierowanie na link 'card' produktu na Discogs
  };

  return (
    <Container>
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} alt={product.desc} />
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
            <AmountContainer>
              {/* Przycisk do dodania do koszyka */}
              <Amount>1</Amount>
            </AmountContainer>
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
