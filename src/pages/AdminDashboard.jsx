import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const buttonStyle = {
    width: isMobile ? "100%" : "auto",
    padding: "15px 25px",
    background: "#FF6F00",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        padding: isMobile ? "1rem" : "2rem",
      }}
    >
      <h1>👨‍💼 Admin Dashboard</h1>

      <h3>Welcome Admin!</h3>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => navigate("/admin/add-product")}
          style={buttonStyle}
        >
          ➕ Add Products
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          style={buttonStyle}
        >
          📦 View Orders
        </button>

        <button style={buttonStyle}>
          ✏️ Edit Products
        </button>

        <button style={buttonStyle}>
          🗑️ Delete Products
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;