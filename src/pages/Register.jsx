import React, { useState } from "react";
import { FaGoogle, FaTimes } from "react-icons/fa";
import axios from "axios";

function Register({
  isOpen,
  onClose,
  onSwitchToSignin,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const slideAnimation = `
    @keyframes slideInRegister {
      from {
        transform: translateX(100%);
        opacity: 0.9;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      );

      setSubmitted(true);

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Close Register panel
      onClose();

      // Open Login panel automatically
      onSwitchToSignin();

    } catch (err) {
      console.error(
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <>
      <style>{slideAnimation}</style>

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
          overflowY: "auto",
          boxShadow: "-4px 0 15px rgba(0,0,0,0.2)",
          animation:
            "slideInRegister 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
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
            Register
          </h2>

          <FaTimes
            onClick={onClose}
            style={{
              cursor: "pointer",
              fontSize: "22px",
            }}
          />
        </div>

        {submitted && (
          <p
            style={{
              color: "green",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Registration Successful!
          </p>
        )}

        {/* Google Signup */}
        <button
          type="button"
          style={{
            width: "100%",
            padding: "12px",
            background: "#DB4437",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaGoogle />
          Continue with Google
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#ddd",
            }}
          />

          <span
            style={{
              margin: "0 10px",
              color: "#999",
            }}
          >
            OR
          </span>

          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#ddd",
            }}
          />
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

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
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
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
            Sign Up
          </button>
        </form>

        {/* Switch To Login */}
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => {
              onClose();
              onSwitchToSignin();
            }}
            style={{
              color: "#FF6F00",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Sign In
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

export default Register;