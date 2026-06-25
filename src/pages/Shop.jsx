
import React, { useState } from "react";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

function Shop() {
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  return (
    <div
      style={{
        padding: isMobile ? "1rem" : "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: "1.5rem",
          color: "#FF6F00",
          fontSize: isMobile ? "1.4rem" : "2rem",
        }}
      >
        🛒 Shop Fresh Eggs
      </h2>

      <div
        style={{
  display: "grid",
  gridTemplateColumns: isMobile
    ? "repeat(2, 1fr)"
    : "repeat(auto-fit, minmax(220px, 1fr))",
  gap: isMobile ? "10px" : "2rem",
  width: "100%",
}}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: isMobile ? "8px" : "12px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                background: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform =
                    "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.1)";
                }
              }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: isMobile
                      ? "120px"
                      : "180px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                style={{
                  padding: isMobile
                    ? "0.7rem"
                    : "1rem",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: isMobile
                      ? "0.85rem"
                      : "1.1rem",
                    marginBottom: "0.5rem",
                    color: "#333",
                    minHeight: isMobile
                      ? "40px"
                      : "50px",
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    color: "#4CAF50",
                    fontSize: isMobile
                      ? "0.9rem"
                      : "1rem",
                  }}
                >
                  ₹{product.price}
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();

                    setToastMessage(
                      `Viewing ${product.name}`
                    );

                    
                  }}
                  style={{
                    padding: isMobile
                      ? "8px 10px"
                      : "10px 16px",
                    cursor: "pointer",
                    background: "#FF6F00",
                    color: "#fff",
                    border: "none",
                    borderRadius: isMobile
                      ? "8px"
                      : "25px",
                    fontWeight: "bold",
                    fontSize: isMobile
                      ? "0.75rem"
                      : "0.9rem",
                    width: isMobile
                      ? "100%"
                      : "auto",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isMobile
                    ? "View"
                    : "View Details"}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Toast message={toastMessage} />
    </div>
  );
}

export default Shop;

