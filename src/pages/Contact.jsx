import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    margin: "0.5rem 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  const buttonStyle = {
    padding: "0.9rem 1.8rem",
    backgroundColor: "#FF6F00",
    color: "white",
    border: "none",
    borderRadius: "25px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
  };

  const iconStyle = {
    color: "#333",
    fontSize: "1.8rem",
    transition: "color 0.3s, transform 0.3s",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#FF6F00", fontSize: "2.2rem", marginBottom: "0.5rem" }}>
        Contact Us
      </h1>
      <p style={{ textAlign: "center", marginBottom: "2rem", fontSize: "1.1rem", color: "#555" }}>
        We’d love to hear from you! Please fill out the form below.
      </p>

      {submitted && (
        <p style={{ color: "green", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>
          ✅ Your message has been submitted successfully!
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {["name", "email", "phone", "subject"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1) + (field !== "phone" ? "*" : "")}
            value={formData[field]}
            onChange={handleChange}
            required={field !== "phone"}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = "#FF6F00";
              e.target.style.boxShadow = "0 0 8px rgba(255,111,0,0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc";
              e.target.style.boxShadow = "none";
            }}
          />
        ))}

        <textarea
          name="message"
          placeholder="Your Message*"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#FF6F00";
            e.target.style.boxShadow = "0 0 8px rgba(255,111,0,0.3)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.boxShadow = "none";
          }}
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
          Submit
        </button>
      </form>

      <div style={{ marginTop: "3rem" }}>
        <h2 style={{ color: "#FF6F00", marginBottom: "1rem" }}>Get in Touch</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:eggbasket@gmail.com" style={{ color: "#333", textDecoration: "none" }}>
            eggbasket@gmail.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+91-9182793934" style={{ color: "#333", textDecoration: "none" }}>
            +91-9182793934
          </a>
        </p>
        <p>
          <strong>Address:</strong> 3-26, Current Office Opposite road, Thimmapuram, Palnadu, India
        </p>

        <h3 style={{ marginTop: "1rem", color: "#FF6F00" }}>Follow Us</h3>
        <div style={{ display: "flex", gap: "1rem", fontSize: "1.5rem" }}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook
              style={iconStyle}
              onMouseEnter={(e) => {
                e.target.style.color = "#3b5998";
                e.target.style.transform = "scale(1.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#333";
                e.target.style.transform = "scale(1)";
              }}
            />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram
              style={iconStyle}
              onMouseEnter={(e) => {
                e.target.style.color = "#C13584";
                e.target.style.transform = "scale(1.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#333";
                e.target.style.transform = "scale(1)";
              }}
            />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter
              style={iconStyle}
              onMouseEnter={(e) => {
                e.target.style.color = "#1DA1F2";
                e.target.style.transform = "scale(1.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#333";
                e.target.style.transform = "scale(1)";
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
