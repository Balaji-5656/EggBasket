import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

function Wishlist() {
  const isMobile = window.innerWidth <= 768;
  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>❤️ My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlistItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "20px",
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              width={isMobile ? "80" : "120"}
            />

            <div style={{ flex: 1 }}>
              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <button
                onClick={() => addToCart(item)}
                style={{
                  padding: "10px",
                  marginRight: isMobile ? "0" : "10px",
marginBottom: isMobile ? "10px" : "0",
width: isMobile ? "100%" : "auto",
                  background: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                🛒 Move to Cart
              </button>

              <button
                onClick={() =>
                  removeFromWishlist(item.id)
                }
                style={{
                  padding: "10px",
                  background: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ❌ Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;