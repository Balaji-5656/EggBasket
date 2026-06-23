import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { products } from "../data/products";
import { WishlistContext } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const {
  addToWishlist,
  wishlistItems,
} = useContext(WishlistContext);

const navigate = useNavigate();

const [quantity, setQuantity] = useState(1);

const product = products.find(
  (item) => item.id === Number(id)
);

const isWishlisted = product
  ? wishlistItems.some(
      (item) => item.id === product.id
    )
  : false;
const isMobile = window.innerWidth <= 768;
  const relatedProducts = products
    .filter((item) => item.id !== Number(id))
    .slice(0, 8);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Product Not Found</h2>
      </div>
    );
  }

  return (
    <div
  style={{
    maxWidth: "1000px",
    margin: "auto",
    padding: isMobile ? "1rem" : "2rem",
    fontFamily: "Arial, sans-serif",
  }}
>
      {/* TOP PRODUCT SECTION */}
      <div
  style={{
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : "1fr 1fr",
    gap: isMobile ? "20px" : "50px",
    marginBottom: "50px",
  }}
>
        {/* IMAGE */}
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginLeft: isMobile ? "0" : "50px",
  }}
>
  <img
    src={product.image}
    alt={product.name}
    style={{
      width: "100%",
      maxWidth: "400px",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    }}
  />
</div>

        {/* PRODUCT INFO */}
        <div>
          <h1>{product.name}</h1>

          <h2
            style={{
              color: "#4CAF50",
              marginTop: "10px",
            }}
          >
            ₹{product.price}
          </h2>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            ⭐ {product.rating} / 5
          </p>

          <p
            style={{
              color:
                product.stock > 0
                  ? "green"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>

          {/* HIGHLIGHTS */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <span>🥚 Farm Fresh</span>
            <span>🚚 Fast Delivery</span>
            <span>🌱 Healthy Choice</span>
          </div>

          {/* QUANTITY */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "25px",
            }}
          >
            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
              }}
            >
              -
            </button>

            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <button
  onClick={() => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, quantity);
    }
    navigate("/cart");
  }}
  style={{
    padding: "12px 25px",
    background: "#1c130d",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
   Add To Cart
</button>
<button
  onClick={() => addToWishlist(product)}
  disabled={isWishlisted}
  style={{
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: isWishlisted
      ? "#ccc"
      : "#E91E63",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: isWishlisted
      ? "not-allowed"
      : "pointer",
    fontWeight: "bold",
  }}
>
  {isWishlisted
    ? "❤️ Added to Wishlist"
    : "🤍 Add to Wishlist"}
</button>

            <button
  onClick={() => {
    addToCart(product, quantity);
    navigate("/checkout");
  }}
  style={{
    padding: "12px 25px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
   Buy Now
</button>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div style={{ marginTop: "50px" }}>
        <h2>📖 Description</h2>
        <p
          style={{
            lineHeight: "1.8",
            color: "#555",
          }}
        >
          {product.description}
        </p>
      </div>

      {/* SPECIFICATIONS */}
      <div style={{ marginTop: "50px" }}>
        <h2>📋 Specifications</h2>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <td>Category</td>
              <td>{product.category}</td>
            </tr>

            <tr>
              <td>Protein</td>
              <td>{product.nutrition?.protein}</td>
            </tr>

            <tr>
              <td>Calories</td>
              <td>{product.nutrition?.calories}</td>
            </tr>

            <tr>
              <td>Fat</td>
              <td>{product.nutrition?.fat}</td>
            </tr>

            <tr>
              <td>Vitamin D</td>
              <td>{product.nutrition?.vitaminD}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* BENEFITS */}
      <div style={{ marginTop: "50px" }}>
        <h2>💪 Benefits</h2>

        <ul>
          {product.benefits?.map(
            (benefit, index) => (
              <li key={index}>
                {benefit}
              </li>
            )
          )}
        </ul>
      </div>

      {/* DELIVERY */}
      <div style={{ marginTop: "50px" }}>
        <h2>🚚 Delivery Information</h2>

        <p>✓ Same Day Delivery Available</p>
        <p>✓ Fresh Farm Eggs</p>
        <p>✓ Free Delivery Above ₹500</p>
      </div>

      {/* REVIEWS */}
      <div style={{ marginTop: "50px" }}>
        <h2>⭐ Customer Reviews</h2>

        <div
          style={{
            background: "#f8f8f8",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "15px",
          }}
        >
          <h4>Balaji</h4>
          <p>⭐⭐⭐⭐⭐</p>
          <p>Very fresh eggs and quick delivery.</p>
        </div>

        <div
          style={{
            background: "#f8f8f8",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "15px",
          }}
        >
          <h4>Rahul</h4>
          <p>⭐⭐⭐⭐</p>
          <p>Good quality organic eggs.</p>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div style={{ marginTop: "70px" }}>
        <h2
          style={{
            marginBottom: "20px",
            borderBottom: "2px solid #FF6F00",
            paddingBottom: "10px",
          }}
        >
          🥚 Related Products
        </h2>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
          }}
        >
          {relatedProducts.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                minWidth: isMobile ? "180px" : "260px",
              }}
            >
              <div
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: isMobile ? "120px" : "180px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <h4>{item.name}</h4>

                  <p
                    style={{
                      color: "#4CAF50",
                      fontWeight: "bold",
                    }}
                  >
                    ₹{item.price}
                  </p>

                  <p>
                    ⭐ {item.rating}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;