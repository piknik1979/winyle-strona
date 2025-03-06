import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 25px 50px;
  font-size: 24px;
  font-weight: bold;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 30px;

  &:hover {
    background-color: white;
    color: black;
    border: 2px solid black;
  }

  @media (max-width: 768px) {
    padding: 15px 30px;
    font-size: 18px;
  }
`;

const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1200px) { 
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) { 
    grid-template-columns: 1fr; /* Wszystkie w jednej kolumnie */
    padding: 10px;
  }
`;

const Categories = () => {
  const navigate = useNavigate();

  const handleSeeAllClick = () => {
    navigate("/catalog");
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button onClick={handleSeeAllClick}>SEE ALL RECORDS</Button>
      </ButtonWrapper>
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default Categories;
