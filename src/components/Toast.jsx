import React from "react";

function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "15px 25px",
        borderRadius: "10px",
        fontWeight: "bold",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
}

export default Toast;