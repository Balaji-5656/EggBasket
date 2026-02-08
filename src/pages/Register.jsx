import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

function Register({ onSwitchToSignin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registration Data:", formData);
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#FF6F00",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background-color 0.3s, transform 0.3s",
  };

  const socialButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.6rem",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
    color: "white",
  };

  const googleStyle = {
    ...socialButtonStyle,
    backgroundColor: "#DB4437",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    margin: "0.5rem 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "1.5rem 0",
    fontSize: "0.9rem",
    color: "#999",
  };

  const dividerLine = {
    flex: 1,
    height: "1px",
    backgroundColor: "#ccc",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#FF6F00",
    fontWeight: "bold",
    transition: "color 0.3s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f7f7",
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "2rem",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#FF6F00",
            marginBottom: "1rem",
          }}
        >
          Register
        </h1>

        {submitted && (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Registration Successful!
          </p>
        )}

        {/* Google Sign Up */}
        <button
          style={googleStyle}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          <FaGoogle style={{ marginRight: "0.5rem" }} />
          Continue with Google
        </button>

        {/* Divider */}
        <div style={dividerStyle}>
          <div style={dividerLine}></div>
          <span style={{ margin: "0 0.5rem" }}>or</span>
          <div style={dividerLine}></div>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name*"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password*"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password*"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#FF8F00";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#FF6F00";
              e.target.style.transform = "scale(1)";
            }}
          >
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
  Already have an account?{" "}
  <span
    onClick={onSwitchToSignin}
    style={{ ...linkStyle, cursor: "pointer" }}
  >
    Sign In
  </span>
</p>

      </div>
    </div>
  );
}

export default Register;
