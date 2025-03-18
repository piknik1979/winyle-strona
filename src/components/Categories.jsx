import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  margin-top: -50px; /* Jeśli chcesz, aby wszystko było odpowiednio wyrównane */
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
  return (
    <Wrapper>
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default Categories;
