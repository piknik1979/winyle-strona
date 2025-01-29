import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: grid;
  gap: 10px;
  padding: 40px;
  grid-template-columns: repeat(4, 1fr); // 4 kolumny na dużych ekranach

  @media (max-width: 1200px) { 
    grid-template-columns: repeat(3, 1fr); // 3 kolumny na laptopach
  }

  @media (max-width: 768px) { 
    grid-template-columns: repeat(2, 1fr); // 2 kolumny na telefonach
    padding: 10px;
  }
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
