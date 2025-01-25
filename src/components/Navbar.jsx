import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
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
  ${mobile({ width: "50px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })};
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  position: relative;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled.a`
  font-size: 14px;
  padding: 5px 10px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Navbar = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isCatalogHovered, setIsCatalogHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsCatalogOpen(true);
    setIsCatalogHovered(true);
  };

  const handleMouseLeave = () => {
    // Delay the closing of the dropdown
    setTimeout(() => {
      if (!isCatalogHovered) {
        setIsCatalogOpen(false);
      }
    }, 200); // 200ms delay
    setIsCatalogHovered(false);
  };

  const handleDropdownHover = () => {
    setIsCatalogHovered(true); // Prevent closing while hovering over the dropdown
  };

  const handleDropdownLeave = () => {
    // Close the dropdown when mouse leaves the dropdown
    setIsCatalogOpen(false);
  };

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
          <Logo>WINYLE.CO.UK</Logo>
        </Center>
        <Right>
          <MenuItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            KATALOG
            {isCatalogOpen && (
              <Dropdown
                onMouseEnter={handleDropdownHover}
                onMouseLeave={handleDropdownLeave} // Close on mouse leave
              >
                <DropdownItem href="#blues">Blues</DropdownItem>
                <DropdownItem href="#rock">Rock</DropdownItem>
                <DropdownItem href="#poprock">Pop Rock</DropdownItem>
                <DropdownItem href="#classic">Classic</DropdownItem>
                <DropdownItem href="#electronic">Electronic</DropdownItem>
              </Dropdown>
            )}
          </MenuItem>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
