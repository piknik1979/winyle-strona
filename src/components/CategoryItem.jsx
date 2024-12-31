import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

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
`;

const Title = styled.h1`
  color: black;
  background-color: white;
  padding: 5px 10px; /* Marginesy wewnętrzne */
  margin-bottom: 20px;
  display: inline-block;
  border-radius: 5px;
  max-width: 90%; /* Ograniczenie szerokości na mniejszych ekranach */
  word-wrap: break-word; /* Łamanie długich słów */

  @media (max-width: 768px) {
    font-size: 18px; /* Zmniejszenie rozmiaru tekstu */
    padding: 3px 8px; /* Mniejsze marginesy wewnętrzne */
    max-width: 100%; /* Pełna szerokość w obrębie kontenera */
  }
`;


const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>EKSPLORUJ</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;