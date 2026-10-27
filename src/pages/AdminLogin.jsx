import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "Balaji@eggbasket.com" &&
      password === "Balaji@123"
    ) {
      localStorage.setItem("admin", "true");

      alert("Admin Login Successful");

      navigate("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div
      style={{
        maxWidth: isMobile ? "100%" : "400px",
        margin: isMobile ? "20px" : "50px auto",
        padding: isMobile ? "20px" : "30px",
        boxSizing: "border-box",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>🔐 Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
          required
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          Login
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxSizing: "border-box",
};
const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#FF6F00",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default AdminLogin;