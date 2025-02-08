import React from "react";
import winylImage from "../assets/winyl.png"; // Załaduj obrazek

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="back-to-top"
      onClick={scrollToTop}
      style={styles.backToTop}
    >
      <div style={styles.backToTopText}>DO GÓRY</div> {/* Tekst w przycisku */}
    </div>
  );
};

// Definicja stylów
const styles = {
  backToTop: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "80px",
    height: "80px",
    backgroundImage: `url(${winylImage})`, // Ustawienie tła na obrazek
    backgroundSize: "cover", // Dopasowanie obrazu do rozmiaru przycisku
    backgroundPosition: "center", // Wyśrodkowanie obrazu
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 10,
  },
  backToTopText: {
    color: "#d9e0de", // Zmieniony kolor na ciemnoszary
    fontSize: "14px",
    textAlign: "center",
    fontWeight: "bold",
    transform: "rotate(-45deg)", // Rotacja tekstu
    position: "absolute", // Aby tekst był wyśrodkowany na obrazie
    zIndex: 1, // Ustawienie, aby tekst był na wierzchu
  },
};

export default BackToTop;
