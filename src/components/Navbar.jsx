import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const [registerHover, setRegisterHover] = useState(false);
  const [panelLoginHover, setPanelLoginHover] = useState(false);
  const [panelCloseHover, setPanelCloseHover] = useState(false);
  


  const linkStyle = {
  margin: "0 0.5rem",
  padding: "0.4rem 1rem",
  textDecoration: "none",
  color: "#333",
  fontWeight: 400,
  border: "0.5px solid #0d0d0dff",
  borderRadius: "20px",
  transition: "all 0.3s ease",
};


  const titleStyle = {
    color: "#FF6F00",
    fontSize: "1.8rem",
    fontWeight: 700,
    textDecoration: "none",
    fontFamily: "Arial, sans-serif",
    transition: "color 0.3s, transform 0.2s",
  };

  const panelStyle = {
    position: "fixed",
    top: 0,
    right: showSignIn ? 0 : "-400px",
    width: "350px",
    height: "100%",
    backgroundColor: "#fff",
    boxShadow: "-4px 0 12px rgba(0,0,0,0.2)",
    transition: "right 0.3s ease",
    zIndex: 2000,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1500,
    display: showSignIn ? "block" : "none",
  };

  return (
    <>
      <nav
        style={{
          padding: "1rem 2rem",
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "1rem",
          fontWeight: "bold",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link
            to="/"
            style={titleStyle}
            onMouseEnter={e => {
              e.target.style.color = "#FFA000";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              e.target.style.color = "#FF6F00";
              e.target.style.transform = "scale(1)";
            }}
          >
            EggBasket🥚
          </Link>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/shop" style={linkStyle}>Shop</Link>
            <Link to="/cart" style={linkStyle}>Cart</Link>
            <Link to="/contact" style={linkStyle}>Contact</Link>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            onClick={() => setShowSignIn(true)}
            onMouseEnter={() => setLoginHover(true)}
            onMouseLeave={() => setLoginHover(false)}
            style={{
              ...linkStyle,
              cursor: "pointer",
              padding: "0.4rem 1rem",
              borderRadius: "20px",
              border: "1px solid #4CAF50",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              backgroundColor: loginHover ? "#4CAF50" : "#fff",
              color: loginHover ? "#fff" : "#333",
              transform: loginHover ? "scale(1.07)" : "scale(1)",
              boxShadow: loginHover ? "0 2px 12px rgba(76,175,80,0.12)" : "none",
              transition: "all 0.28s cubic-bezier(.4,.2,.2,1)",
            }}
          >
            Login
          </div>
          <Link
            to="/register"
            onMouseEnter={() => setRegisterHover(true)}
            onMouseLeave={() => setRegisterHover(false)}
            style={{
              ...linkStyle,
              padding: "0.4rem 1rem",
              borderRadius: "20px",
              border: "1px solid #2196F3",
              backgroundColor: registerHover ? "#2196F3" : "#fff",
              color: registerHover ? "#fff" : "#333",
              transform: registerHover ? "scale(1.07)" : "scale(1)",
              boxShadow: registerHover ? "0 2px 12px rgba(33,150,243,0.12)" : "none",
              transition: "all 0.28s cubic-bezier(.4,.2,.2,1)",
            }}
          >
            Register
          </Link>
        </div>
      </nav>

      <div
        style={overlayStyle}
        onClick={() => setShowSignIn(false)}
      ></div>

      <div style={panelStyle}>
        <h2 style={{ marginBottom: "1rem" }}>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          style={{
            padding: "0.8rem",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            padding: "0.8rem",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          style={{
            padding: "0.8rem",
            backgroundColor: panelLoginHover ? "#43a047" : "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s, transform 0.2s, box-shadow 0.2s",
            transform: panelLoginHover ? "scale(1.05)" : "scale(1)",
            boxShadow: panelLoginHover ? "0 4px 16px rgba(76,175,80,0.14)" : "none",
          }}
          onMouseEnter={() => setPanelLoginHover(true)}
          onMouseLeave={() => setPanelLoginHover(false)}
        >
          Login
        </button>
        <button
          onClick={() => setShowSignIn(false)}
          style={{
            marginTop: "1rem",
            padding: "0.6rem",
            backgroundColor: panelCloseHover ? "#ccc" : "#ddd",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s, transform 0.2s, box-shadow 0.2s",
            transform: panelCloseHover ? "scale(1.05)" : "scale(1)",
            boxShadow: panelCloseHover ? "0 2px 8px rgba(0,0,0,0.10)" : "none",
          }}
          onMouseEnter={() => setPanelCloseHover(true)}
          onMouseLeave={() => setPanelCloseHover(false)}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default Navbar;
