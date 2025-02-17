import React from "react";
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  padding: 10px;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 80%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 2;
  cursor: pointer;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  text-align: center;
  max-width: 90%;
`;

const Product = ({ item }) => {
  const navigate = useNavigate();

  // Funkcja obsługująca kliknięcie na koszyk
  const handleCartClick = () => {
    console.log("Kliknięto koszyk!");
    // Kliknięcie na koszyk przenosi do linku 'cart' z data.js
    window.open(item.cart, "_blank");
  };

  // Funkcja obsługująca kliknięcie na ikonę lupy
  const handleSearchClick = () => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <Container>
      <ImageWrapper>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          <Image src={item.img} alt={item.desc} />
        </a> {/* Kliknięcie na obrazek przekierowuje do linku w data.js */}
        <Info>
          <Icon onClick={handleCartClick}>
            <ShoppingCartOutlined />
          </Icon>
          <Icon onClick={handleSearchClick}>
            <SearchOutlined />
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info>
      </ImageWrapper>
      <Description>{item.desc}</Description>
    </Container>
  );
};

export default Product;
