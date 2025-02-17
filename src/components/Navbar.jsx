import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined, Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive"; // Media queries dla wersji mobilnej
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px", marginTop: "20px" })} /* 5mm odstępu od góry w wersji mobilnej */
`;


const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;

  /* Logo idealnie na środku w wersji mobilnej */
  ${mobile({
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ display: "none" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Hamburger = styled.div`
  display: none;
  ${mobile({
    display: "block",
    position: "absolute",
    right: "20px", // Hamburger przesunięty o 5mm od krawędzi ekranu (~10px)
    cursor: "pointer",
    zIndex: 2,
  })}
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  padding: 20px;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.menuOpen ? "translateX(0)" : "translateX(100%)")};
`;

const MenuItemMobile = styled.div`
  margin: 15px 0;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  color: white;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 30px;
  color: white;
  z-index: 1001;
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>

        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>WINYLE.CO.UK</Logo>
          </Link>
        </Center>

        <Right>
          <MenuItem>HOME</MenuItem>
          <Link to="/catalog" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem>RECORDS</MenuItem>
          </Link>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>

        <Hamburger onClick={() => setMenuOpen(true)}>
          <MenuIcon style={{ fontSize: 30 }} />
        </Hamburger>
      </Wrapper>

      <Menu menuOpen={menuOpen}>
        <CloseButton onClick={() => setMenuOpen(false)}>
          <CloseIcon />
        </CloseButton>
        <Link to="/catalog" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItemMobile>KATALOG</MenuItemMobile>
        </Link>
        <MenuItemMobile>REGISTER</MenuItemMobile>
        <MenuItemMobile>SIGN IN</MenuItemMobile>
        <MenuItemMobile>
          <Badge badgeContent={4} color="primary">
            <ShoppingCartOutlined />
          </Badge>
        </MenuItemMobile>
      </Menu>
    </Container>
  );
};

export default Navbar;
