import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";

// Stylowanie komponentów
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
  margin: 5px;
  min-width: 280px;
  max-width: 300px;  /* Ograniczamy maksymalną szerokość */
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  border-radius: 0px;  /* Usuwamy zaokrąglenia rogów */
  overflow: hidden; /* Ukrywa elementy wychodzące poza kontener */

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;    /* Obrazek wypełnia całą szerokość kontenera */
  height: 100%;   /* Obrazek wypełnia całą wysokość kontenera */
  object-fit: contain; /* Obrazek nie będzie przycinany, zachowa proporcje */
  z-index: 2;
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
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    // Zmieniamy tu link na kontener, aby całość była klikalna
    <a href={item.link} target="_blank" rel="noopener noreferrer">
      <Container>
        <Image src={item.img} alt={item.title} />
        <Info>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <SearchOutlined />
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info>
      </Container>
    </a>
  );
};

export default Product;
