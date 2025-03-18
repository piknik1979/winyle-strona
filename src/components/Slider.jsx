import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data"; // Importujemy popularProducts
import { mobile } from "../responsive";

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
  background-color: #fff7f7;
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
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transition: transform 1.5s ease-in-out;
  transform: translateX(${(props) => props.slideIndex * -100}vw); /* Przesuwamy cały slajd */
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #${(props) => props.bg};
  ${mobile({ height: "50vh" })} /* Wersja mobilna */
`;

const ImgContainer = styled.div`
  width: 25vw; /* Zmniejszamy do 50% szerokości ekranu */
  height: 75%; /* Teraz 1/6 mniej - zmniejszamy obraz o 1/6 wysokości */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px; /* Dodajemy odstęp, aby nie przylegał do krawędzi */
  ${mobile({
    width: "66.66vw", /* Na mobilnych zostawiamy 2/3 szerokości */
    height: "80%", /* Zmniejszamy wysokość */
    padding: "10px", /* Mały odstęp */
  })}
  margin-top: -180px; /* Podnosimy okładkę o 30px */
  margin-bottom: 20px; /* Dodajemy margines dolny, aby obrazek nie przylegał do krawędzi ekranu */
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  margin: auto; /* Zapobiega przyleganiu */
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({ padding: "15px" })}
`;

const Title = styled.h1`
  font-size: 70px;
  ${mobile({ fontSize: "30px" })}
`;

const Artist = styled.h2` /* Nowy komponent dla artysty */
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
  ${mobile({ fontSize: "20px" })} /* Zmniejszamy font w wersji mobilnej */
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({ fontSize: "14px", margin: "15px 0" })}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: black; /* Czarne tło */
  color: white; /* Białe napisy */
  cursor: pointer;
  border: 2px solid black;
  border-radius: 25px; /* Bardziej zaokrąglony */
  transition: 0.3s ease;
  
  &:hover {
    background-color: white;
    color: black;
  }

  ${mobile({
    fontSize: "15px", /* Mniejsza czcionka na mobile */
    padding: "7px 14px", /* Mniejszy guzik */
  })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);

  // Funkcja do losowego wyboru produktów
  const getRandomProducts = () => {
    const shuffled = [...popularProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5); // Wybierz 5 losowych płyt
  };

  // Ustawienie losowych produktów po załadowaniu komponentu
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
              <Artist>{product.artist}</Artist>
              <Desc>{product.genre}</Desc>
              <Button onClick={() => window.open(product.link, "_blank")}>
                BUY ON DISCOGS
              </Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
