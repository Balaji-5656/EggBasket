import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{
      background: "#fff5f0",
      color: "#333",
      padding: "2rem 1rem",
      fontSize: "0.9rem",
      textAlign: "center",
      marginTop: "auto" 
    }}>
      <p>© 2025 EggBasket. All rights reserved.</p>
      <div>
        <Link to="/contact" style={{ marginRight: "1rem" }}>Contact</Link>
        <Link to="/about">About</Link>
      </div>
    </footer>
  );
};

export default Footer;
