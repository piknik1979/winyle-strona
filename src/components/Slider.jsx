import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ height: "auto" })}; /* Wersja mobilna: dostosowanie wysokości */
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
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;

  /* Na wersji mobilnej zmniejszamy wielkość strzałek */
  ${mobile({ width: "40px", height: "40px" })};
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};

  /* Na urządzeniach mobilnych dostosowujemy wysokość */
  ${mobile({ height: "auto" })};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ height: "auto", width: "60%" })}; /* Na urządzeniach mobilnych obrazek dostosowuje się do szerokości */
`;

const Image = styled.img`
  width: 70%; /* Dla desktopu obrazek zajmuje 50% szerokości kontenera */
  height: auto; /* Zachowanie proporcji na desktopie */
  object-fit: contain; /* Zapewnienie, że obrazek nie jest przycinany */
  
  /* Na mobilnych urządzeniach dostosowujemy szerokość do 100% kontenera */
  ${mobile({ width: "100%", height: "auto" })}; /* Na mobilnych szerokość 100% z zachowaniem proporcji */
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 10px;
  ${mobile({ padding: "20px", textAlign: "center" })}; /* Zmniejszenie odstępów na mobilnych */
`;

const Title = styled.h1`
  font-size: 55px;
  ${mobile({ fontSize: "24px" })}; /* Poprawiona składnia */
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({ fontSize: "16px", margin: "20px 0px" })}; /* Poprawiona składnia */
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <Button>WEŹ POKAŻ</Button>
              </a>
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
