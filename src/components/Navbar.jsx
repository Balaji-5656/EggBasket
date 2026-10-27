import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";

function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [loginHover, setLoginHover] = useState(false);
  const [registerHover, setRegisterHover] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("👋 Logged out successfully!");

    navigate("/");
    window.location.reload();
  };

  const linkStyle = {
    margin: "0 0.5rem",
    padding: "0.4rem 1rem",
    textDecoration: "none",
    color: "#333",
    fontWeight: 400,
    border: "0.5px solid #0d0d0d",
    borderRadius: "20px",
    transition: "all 0.3s ease",
  };

  const titleStyle = {
    color: "#FF6F00",
    fontSize: isMobile ? "1.5rem" : "1.8rem",
    fontWeight: 700,
    textDecoration: "none",
  };

  const menuItemStyle = {
    padding: "12px",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "8px",
    transition: "0.3s",
  };

  return (
    <>
      <nav
        style={{
          padding: "1rem",
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Link to="/" style={titleStyle}>
            EggBasket🥚
          </Link>

          {!isMobile ? (
            <div style={{ display: "flex" }}>
              <Link to="/" style={linkStyle}>
                Home
              </Link>

              <Link to="/shop" style={linkStyle}>
                Shop
              </Link>

              <Link to="/cart" style={linkStyle}>
                Cart
              </Link>

              <Link to="/contact" style={linkStyle}>
                Contact
              </Link>
            </div>
          ) : (
            <div>
              <button
                onClick={() =>
                  setShowMenu(!showMenu)
                }
                style={{
                  fontSize: "24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ☰
              </button>

              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "70px",
                    left: 0,
                    width: "100%",
                    background: "#fff",
                    boxShadow:
                      "0 2px 10px rgba(0,0,0,0.1)",
                    padding: "10px",
                  }}
                >
                  <Link
                    to="/"
                    style={{
                      ...menuItemStyle,
                      display: "block",
                    }}
                  >
                    Home
                  </Link>

                  <Link
                    to="/shop"
                    style={{
                      ...menuItemStyle,
                      display: "block",
                    }}
                  >
                    Shop
                  </Link>

                  <Link
                    to="/cart"
                    style={{
                      ...menuItemStyle,
                      display: "block",
                    }}
                  >
                    Cart
                  </Link>

                  <Link
                    to="/contact"
                    style={{
                      ...menuItemStyle,
                      display: "block",
                    }}
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {user ? (
            <div
              ref={profileRef}
              style={{ position: "relative" }}
            >
              <div
                onClick={() =>
                  setShowProfile(!showProfile)
                }
                style={{
                  ...linkStyle,
                  cursor: "pointer",
                  fontWeight: "bold",
                  border:
                    "1px solid #FF6F00",
                }}
              >
                👤 Profile
              </div>

              {showProfile && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: 0,
                    width: "250px",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.2)",
                    padding: "20px",
                    zIndex: 2000,
                  }}
                >
                  <h3>
                    Hello {user.name}
                  </h3>

                  <p>{user.phone}</p>

                  <hr />

                  <div
                    style={menuItemStyle}
                    onClick={() =>
                      navigate("/my-orders")
                    }
                  >
                    Orders
                  </div>

                  <div
                    style={menuItemStyle}
                    onClick={() =>
                      navigate("/wishlist")
                    }
                  >
                    Wishlist
                  </div>

                  <div
                    style={menuItemStyle}
                    onClick={() =>
                      navigate(
                        "/saved-addresses"
                      )
                    }
                  >
                    Saved Addresses
                  </div>

                  <div
                    style={menuItemStyle}
                    onClick={() =>
                      navigate("/profile")
                    }
                  >
                    Edit Profile
                  </div>

                  <hr />

                  <div
                    style={{
                      ...menuItemStyle,
                      color: "red",
                      fontWeight: "bold",
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div
                onClick={() =>
                  setShowSignIn(true)
                }
                onMouseEnter={() =>
                  setLoginHover(true)
                }
                onMouseLeave={() =>
                  setLoginHover(false)
                }
                style={{
                  ...linkStyle,
                  cursor: "pointer",
                  border:
                    "1px solid #4CAF50",
                  backgroundColor:
                    loginHover
                      ? "#4CAF50"
                      : "#fff",
                  color: loginHover
                    ? "#fff"
                    : "#333",
                }}
              >
                Login
              </div>

              <div
                onClick={() =>
                  setShowRegister(true)
                }
                onMouseEnter={() =>
                  setRegisterHover(true)
                }
                onMouseLeave={() =>
                  setRegisterHover(false)
                }
                style={{
                  ...linkStyle,
                  cursor: "pointer",
                  border:
                    "1px solid #2196F3",
                  backgroundColor:
                    registerHover
                      ? "#2196F3"
                      : "#fff",
                  color: registerHover
                    ? "#fff"
                    : "#333",
                }}
              >
                Register
              </div>
            </>
          )}
        </div>
      </nav>

      <SignIn
        isOpen={showSignIn}
        onClose={() =>
          setShowSignIn(false)
        }
      />

      <Register
        isOpen={showRegister}
        onClose={() =>
          setShowRegister(false)
        }
        onSwitchToSignin={() => {
          setShowRegister(false);
          setShowSignIn(true);
        }}
      />
    </>
  );
}

export default Navbar;