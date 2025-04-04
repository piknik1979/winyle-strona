import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white !important;
  background: white !important; /* Druga próba wymuszenia białego tła */
  
  ${mobile({ 
    width: "100%",
    height: "50vh",
    margin: "5px 0"
  })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
  position: relative; /* Upewniamy się, że nie dziedziczy tła */
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent !important; /* Usunięcie szarego tła */
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  border: none;
  padding: 15px 25px;
  background-color: white;
  color: black;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate(`/catalog/${encodeURIComponent(item.genre)}`);
  };

  return (
    <Container>
      <Image src={item.img} alt={item.genre} />
      <Info>
        <Title>{item.genre}</Title>
        <Button onClick={handleShopNow}>SHOP NOW</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
