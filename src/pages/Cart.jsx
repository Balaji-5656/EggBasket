import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

function Cart() {
  const isMobile = window.innerWidth <= 768;
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#FF6F00", marginBottom: "2rem" }}>🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.1rem" }}>Your cart is empty.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
                justifyContent: "space-between",
                gap: isMobile ? "15px" : "0",
                padding: "1rem",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: isMobile ? "80px" : "100px",
height: isMobile ? "80px" : "100px", objectFit: "cover", borderRadius: "8px" }}
              />

              <div style={{ flex: 1, marginLeft: isMobile ? "0" : "1.5rem", }}>
                <h3 style={{ marginBottom: "0.5rem", color: "#333" }}>{item.name}</h3>
                <p style={{ fontWeight: "bold", color: "#4CAF50" }}>₹{item.price}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "0.4rem 0.6rem",
                    cursor: "pointer",
                    background: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaMinus />
                </button>
                <span style={{ minWidth: "25px", textAlign: isMobile ? "center" : "right" }}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "0.4rem 0.6rem",
                    cursor: "pointer",
                    background: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaPlus />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  marginLeft: "1rem",
                  color: "white",
                  backgroundColor: "#FF3B30",
                  border: "none",
                  padding: "0.5rem 0.8rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "background-color 0.3s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#E12B20";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#FF3B30";
                  e.target.style.transform = "scale(1)";
                }}
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))}

          <div
            style={{
              textAlign: "right",
              marginTop: "2rem",
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Total: ₹{totalPrice}
          </div>

          <div style={{ textAlign: isMobile ? "center" : "right", marginTop: "1rem" }}>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#45a049";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#4CAF50";
                e.target.style.transform = "scale(1)";
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
