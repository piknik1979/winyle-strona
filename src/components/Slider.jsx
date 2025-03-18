import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data"; // Importujemy popularProducts
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

// Funkcja generująca pastelowy kolor HSL
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
  ${mobile({ height: "50vh" })} /* Wersja mobilna */
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
  background-color: ${(props) => props.bg}; /* Używamy losowego pastelowego koloru */
  ${mobile({ height: "50vh" })}
`;

const ImgContainer = styled.div`
  width: 25vw; /* Okładka zajmuje 25% szerokości */
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  ${mobile({
    width: "66.66vw",
    height: "80%",
    padding: "10px",
  })}
  margin-top: -180px;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  margin: auto;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({ padding: "15px" })}
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 70px;
  ${mobile({ fontSize: "30px" })}
`;

const Artist = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
  ${mobile({ fontSize: "20px" })}
`;

const Desc = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({ fontSize: "14px" })}
`;

/* Przycisk BUY ON DISCOGS */
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
  position: relative;
  z-index: 3;
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

/* Przycisk SEE ALL RECORDS */
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
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;

  &:hover {
    background-color: white;
    color: black;
  }

  ${mobile({
    fontSize: "18px",
    padding: "10px 25px",
  })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();

  const getRandomProducts = () => {
    const shuffled = [...popularProducts].sort(() => 0.5 - Math.random());
    // Do każdego produktu przypisujemy pastelowy kolor tła
    return shuffled.slice(0, 5).map((product) => ({
      ...product,
      bg: generatePastelColor(),
    }));
  };

  useEffect(() => {
    setRandomProducts(getRandomProducts());
  }, []);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : randomProducts.length - 1);
    } else {
      setSlideIndex(slideIndex < randomProducts.length - 1 ? slideIndex + 1 : 0);
    }
  };

  const handleSeeAllClick = () => {
    navigate("/catalog");
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
              <ButtonDiscogs onClick={() => window.open(product.link, "_blank")}>
                BUY ON DISCOGS
              </ButtonDiscogs>
              <Desc>{product.genre}</Desc>
              <Artist>{product.artist}</Artist>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
      <ButtonSeeAll onClick={handleSeeAllClick}>
        SEE ALL RECORDS
      </ButtonSeeAll>
    </Container>
  );
};

export default Slider;
