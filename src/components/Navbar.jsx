import { Search, Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useTranslation } from "react-i18next"; // <-- Import hooka

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px", marginTop: "20px" })}
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
  font-weight: bold;
  &:hover { color: #4CAF50; }
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
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ position: "absolute", left: "50%", transform: "translateX(-50%)" })}
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
  ${mobile({ display: "block", position: "absolute", right: "20px", cursor: "pointer", zIndex: 2 })}
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(24, 40, 34, 0.77);
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

const Navbar = ({ onSearch = () => {}, session }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Hook do tłumaczeń
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'pl' : 'en');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Błąd wylogowania:", error.message);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language onClick={toggleLanguage}>
            {i18n.language.toUpperCase()}
          </Language>
          <SearchContainer>
            <Input placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>

        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>WINYLE.CO.UK</Logo>
          </Link>
        </Center>

        <Right>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem>{t("navbar.home")}</MenuItem>
          </Link>
          <Link to="/catalog" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem>{t("navbar.records")}</MenuItem>
          </Link>
          
          {session ? (
            <>
              <MenuItem style={{ color: "#4CAF50", cursor: "default" }}>
                {session.user.user_metadata?.display_name || session.user.email}
              </MenuItem>
              <MenuItem onClick={handleLogout}>{t("navbar.logout")}</MenuItem>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                <MenuItem>{t("navbar.register")}</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                <MenuItem>{t("navbar.signin")}</MenuItem>
              </Link>
            </>
          )}
        </Right>

        <Hamburger onClick={() => setMenuOpen(true)}>
          <MenuIcon style={{ fontSize: 30, color: "black" }} />
        </Hamburger>
      </Wrapper>

      <Menu menuOpen={menuOpen}>
        <CloseButton onClick={() => setMenuOpen(false)}><CloseIcon /></CloseButton>
        <MenuItemMobile onClick={toggleLanguage} style={{ color: "#4CAF50" }}>
          LANG: {i18n.language.toUpperCase()}
        </MenuItemMobile>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={() => setMenuOpen(false)}>
          <MenuItemMobile>{t("navbar.home")}</MenuItemMobile>
        </Link>
        <Link to="/catalog" style={{ textDecoration: "none", color: "inherit" }} onClick={() => setMenuOpen(false)}>
          <MenuItemMobile>{t("navbar.records")}</MenuItemMobile>
        </Link>
        
        {session ? (
          <MenuItemMobile onClick={() => { handleLogout(); setMenuOpen(false); }}>{t("navbar.logout")}</MenuItemMobile>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }} onClick={() => setMenuOpen(false)}>
              <MenuItemMobile>{t("navbar.register")}</MenuItemMobile>
            </Link>
            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }} onClick={() => setMenuOpen(false)}>
              <MenuItemMobile>{t("navbar.signin")}</MenuItemMobile>
            </Link>
          </>
        )}
      </Menu>
    </Container>
  );
};

export default Navbar;