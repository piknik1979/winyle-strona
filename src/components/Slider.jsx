import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data"; // Importujemy popularProducts
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

// Funkcja generująca pastelowy kolor
const generatePastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 50%, 85%)`;
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ height: "50vh" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgb(211, 206, 206);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.6;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transition: transform 1.5s ease-in-out;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bg};
  ${mobile({ height: "50vh" })}
`;

const ImgContainer = styled.div`
  width: 25vw;
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  ${mobile({
    width: "66.66vw",
    height: "80%",
    padding: "10px",
    marginTop: "20px",
  })}
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({ padding: "15px" })}
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const Title = styled.h1`
  margin-top: 5px;
  font-size: 50px; /* Większa czcionka dla dużych ekranów */

  @media screen and (max-width: 1200px) {
    font-size: 42px; /* Trochę mniejsza dla laptopów */
  }

  ${mobile({ fontSize: "22px" })} /* Mniejsza dla mobilnych */
`;


const Desc = styled.p`
  margin: 0;
  font-size: 32px; /* Większa czcionka dla desktopów */
  font-weight: 500;
  letter-spacing: 3px;

  @media screen and (max-width: 1200px) {
    font-size: 28px; /* Mniejsza dla laptopów */
  }

  ${mobile({ fontSize: "12px" })} /* Jeszcze mniejsza dla telefonów */
`;
const ButtonDiscogs = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 20px;
  width: fit-content;

  &:hover {
    background-color: white;
    color: black;
    border: 2px solid black;
  }

  ${mobile({
    fontSize: "16px",
    padding: "8px 16px",
  })}
`;

const ButtonSeeAll = styled.button`
  padding: 25px 50px;
  font-size: 24px;
  font-weight: bold;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 30px;
  position: absolute;
  top: 5%;
  left: 15%;
  transform: translateX(-50%);

  &:hover {
    background-color: white;
    color: black;
  }

  @media screen and (max-width: 768px) {
    left: 33%;
    font-size: 18px;
    padding: 10px 25px;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffledProducts = [...popularProducts]
      .sort(() => Math.random() - 0.5) // Losowe przemieszanie tablicy
      .map(product => ({
        ...product,
        bg: generatePastelColor(),
      }));

    setRandomProducts(shuffledProducts);
  }, []);

  const handleClick = (direction) => {
    setSlideIndex(direction === "left"
      ? (slideIndex > 0 ? slideIndex - 1 : randomProducts.length - 1)
      : (slideIndex < randomProducts.length - 1 ? slideIndex + 1 : 0));
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {randomProducts.map((product) => (
          <Slide bg={product.bg} key={product.id}>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.desc}</Title>
              <ButtonDiscogs onClick={() => window.open(product.link, "_blank")}>BUY ON DISCOGS</ButtonDiscogs>
              <Desc>{product.genre}</Desc>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
      <ButtonSeeAll onClick={() => navigate("/catalog")}>
        SEE ALL RECORDS
      </ButtonSeeAll>
    </Container>
  );
};

export default Slider;
