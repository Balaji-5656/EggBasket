import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

import whiteEggs from "../assets/white-eggs.jpg";
import brownEggs from "../assets/brown-eggs.jpg";
import freeRange from "../assets/free-range-eggs.jpg";
import cageFree from "../assets/cage-free-eggs.jpg";
import organicEggs from "../assets/organic-eggs.jpg";
import duckEggs from "../assets/duck-eggs.jpg";
import quailEggs from "../assets/quail-eggs.jpg";
import omegaEggs from "../assets/omega3-eggs.jpg";
import vitaminEggs from "../assets/vitamin-eggs.jpg";
import desiEggs from "../assets/desi-eggs.jpg";


const products = [
  { id: 1, name: "White Chicken Eggs (12 pack)", price: 90, image: whiteEggs },
  { id: 2, name: "Brown Eggs (12 pack)", price: 110, image: brownEggs },
  { id: 3, name: "Free-Range Eggs (6 pack)", price: 95, image: freeRange },
  { id: 4, name: "Cage-Free Eggs (12 pack)", price: 130, image: cageFree },
  { id: 5, name: "Organic Eggs (12 pack)", price: 150, image: organicEggs },
  { id: 6, name: "Duck Eggs (6 pack)", price: 180, image: duckEggs },
  { id: 7, name: "Quail Eggs (24 pack)", price: 200, image: quailEggs },
  { id: 8, name: "Omega-3 Enriched Eggs (12 pack)", price: 160, image: omegaEggs },
  { id: 9, name: "Vitamin-Enriched Eggs (12 pack)", price: 170, image: vitaminEggs },
  { id: 10, name: "Country (Desi) Eggs (12 pack)", price: 140, image: desiEggs },
];

function Shop() {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "1.5rem", color: "#FF6F00" }}>🛒 Shop Fresh Eggs</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              background: "#fff",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  transition: "transform 0.3s",
                }}
              />
            </div>

            <div style={{ padding: "1rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
                {product.name}
              </h3>
              <p style={{ fontWeight: "bold", marginBottom: "1rem", color: "#4CAF50" }}>
                ₹{product.price}
              </p>
              <button
                onClick={() => addToCart(product)}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  background: "#FF6F00",
                  color: "#fff",
                  border: "none",
                  borderRadius: "25px",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#FFA000";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#FF6F00";
                  e.target.style.transform = "scale(1)";
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
