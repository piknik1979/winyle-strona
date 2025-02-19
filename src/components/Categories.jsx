import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { categories, sliderItems } from "../data"; // Import sliderItems dla tła
import CategoryItem from "./CategoryItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #${sliderItems[0].bg}; /* Kolor tła z pierwszego slajdu */
  padding: 40px 20px;
`;

const Button = styled.button`
  padding: 15px 25px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: black; /* Czarne tło */
  color: white; /* Białe napisy */
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 25px;
  margin-bottom: 10px;

  &:hover {
    background-color: white;
    color: black;
    border: 2px solid black;
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
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
  }
`;

const Categories = () => {
  const navigate = useNavigate();

  const handleSeeAllClick = () => {
    navigate("/catalog");
    window.location.reload(); // Opcjonalne odświeżenie
  };

  return (
    <Wrapper>
      <Button onClick={handleSeeAllClick}>SEE ALL RECORDS</Button>
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default Categories;
