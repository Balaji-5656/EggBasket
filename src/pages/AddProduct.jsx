import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const isMobile = window.innerWidth <= 768;
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    stock: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        product
      );

      alert(res.data.message);

      setProduct({
        name: "",
        price: "",
        image: "",
        category: "",
        stock: "",
        description: "",
      });

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: isMobile ? "100%" : "600px",
        margin: isMobile ? "20px" : "40px auto",
        padding: isMobile ? "20px" : "30px",
        boxSizing: "border-box",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>➕ Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: isMobile ? "80px" : "100px",
          }}
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
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Product
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

export default AddProduct;