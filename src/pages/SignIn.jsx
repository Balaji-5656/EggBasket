import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function SignIn({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      // Save logged-in user details
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert(`🎉 Welcome ${res.data.user.name}!`);

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      setError("");

      // Close login panel
      onClose();

      // Refresh page to update Navbar
      window.location.reload();

    } catch (err) {
      console.error(
        "Login Error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        "Login failed. Please try again."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          zIndex: 999,
        }}
      />

      {/* Slide Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "400px",
          height: "100vh",
          background: "#fff",
          zIndex: 1000,
          padding: "25px",
          boxShadow: "-4px 0 15px rgba(0,0,0,0.2)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              color: "#FF6F00",
              margin: 0,
            }}
          >
            Login
          </h2>

          <FaTimes
            onClick={onClose}
            style={{
              cursor: "pointer",
              fontSize: "22px",
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "15px",
            }}
          >
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#FF6F00",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Login
          </button>
        </form>
        <p
  style={{
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
  }}
>
  Are you an Admin?{" "}
  <span
    onClick={() => {
      onClose();
      navigate("/admin");
    }}
    style={{
      color: "#FF6F00",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Login as Admin
  </span>
</p>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default SignIn;