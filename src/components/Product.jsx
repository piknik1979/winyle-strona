import React, { useState } from "react";
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

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Tooltip = styled.span`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 5px;
  position: absolute;
  top: -30px;
  font-size: 12px;
  transition: opacity 0.3s ease-in-out;
  white-space: nowrap;
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

  const [hoveredIcon, setHoveredIcon] = useState(null);

  // Kliknięcie na ikonę koszyka -> przekierowanie do zakupu
  const handleCartClick = () => {
    window.open(item.cart, "_blank");
  };

  // Kliknięcie na ikonę lupy -> przekierowanie na stronę produktu
  const handleSearchClick = () => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  // Kliknięcie na ikonę serca -> przekierowanie do Wikipedii
  const handleFavoriteClick = () => {
    window.open(item.wiki, "_blank");
  };

  return (
    <Container>
      <ImageWrapper>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          <Image src={item.img} alt={item.desc} />
        </a>
        <Info>
          <IconContainer
            onMouseEnter={() => setHoveredIcon("cart")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Icon onClick={handleCartClick}>
              <ShoppingCartOutlined />
            </Icon>
            <Tooltip visible={hoveredIcon === "cart"}>Buy on Discogs</Tooltip>
          </IconContainer>

          <IconContainer
            onMouseEnter={() => setHoveredIcon("search")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Icon onClick={handleSearchClick}>
              <SearchOutlined />
            </Icon>
            <Tooltip visible={hoveredIcon === "search"}>Product Info</Tooltip>
          </IconContainer>

          <IconContainer
            onMouseEnter={() => setHoveredIcon("favorite")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Icon onClick={handleFavoriteClick}>
              <FavoriteBorderOutlined />
            </Icon>
            <Tooltip visible={hoveredIcon === "favorite"}>Wiki about the Record</Tooltip>
          </IconContainer>
        </Info>
      </ImageWrapper>
      <Description>{item.desc}</Description>
    </Container>
  );
};

export default Product;
