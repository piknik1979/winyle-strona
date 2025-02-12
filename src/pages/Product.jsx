import { useLocation, useParams } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";  // Dodajemy responsywne style

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px" })}  // Zmieniamy układ na kolumnowy w wersji mobilnej
`;

const ImgContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  ${mobile({ width: "100%", marginRight: "0" })}  // Na urządzeniach mobilnych ustawiamy szerokość na 100%
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;  // Zmniejszamy wysokość o 1/4 na wersji desktopowej
  object-fit: cover;
  ${mobile({ height: "40vh" })}  // W wersji mobilnej obrazek będzie miał wysokość 40vh, będzie widoczny nad danymi
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}  // Zmniejszamy padding na urządzeniach mobilnych
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
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
  ${mobile({ width: "100%" })}  // Zmienia szerokość na 100% na urządzeniach mobilnych
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
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  if (!product) return <p>Produkt nie znaleziony</p>;

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} alt={product.desc} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.desc}</Title>
          <Details>
            <p><strong>Gatunek:</strong> {product.genre}</p>
            <p><strong>Stan Płyty:</strong> {product.media}</p>
            <p><strong>Stan Okładki:</strong> {product.sleeve}</p>
          </Details>
          <Price>{product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
