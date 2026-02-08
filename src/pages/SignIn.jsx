import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";   

function Signin({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("token", res.data.token);
      alert(" Login successful!");
      onClose();
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", top: 0, right: 0, width: "350px", background: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <FaTimes onClick={onClose} style={{ cursor: "pointer" }} />
      </div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Signin;
