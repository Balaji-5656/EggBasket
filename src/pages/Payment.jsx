import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Payment() {
  const {
    cartItems,
    totalPrice,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();
const isMobile = window.innerWidth <= 768;
  const [method, setMethod] = useState("cod");

  const mrp = totalPrice;
  const platformFee = 5;
  const firstOrderDiscount = Math.round(
    totalPrice * 0.2
  );

  const finalAmount =
    mrp + platformFee - firstOrderDiscount;

  const placeOrder = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const latestAddress = JSON.parse(
  localStorage.getItem("latestAddress")
);

      if (!user) {
        alert("Please login first");
        return;
      }

      if (!latestAddress) {
        alert(
          "Please save your address before placing the order."
        );
        navigate("/checkout");
        return;
      }

      const orderData = {
 user: user.id || user._id,
address: latestAddress._id,

  items: cartItems.map((item) => ({
    productId: item.id,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
  })),

  address: latestAddress._id,

  totalAmount: finalAmount,

  paymentMethod:
    method === "cod"
      ? "COD"
      : method.toUpperCase(),
};

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );

      alert(
        `🎉 ${res.data.message}`
      );

      clearCart();

      localStorage.removeItem(
        "latestAddress"
      );

      navigate("/my-orders");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
       display: "flex",
       flexDirection: isMobile ? "column" : "row",
       gap: "20px",
        background: "#f5f5f5",
      }}
    >
      {/* Payment Options */}
      <div
        style={{
          flex: 2,
          background: "#fff",
          width: "100%",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h2> Complete Payment</h2>

        <div style={{ marginTop: "20px" }}>
          <div
            onClick={() => setMethod("card")}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              cursor: "pointer",
              marginBottom: "10px",
              background:
                method === "card"
                  ? "#f0f8ff"
                  : "#fff",
            }}
          >
            💳 Credit / Debit Card
          </div>

          <div
            onClick={() => setMethod("upi")}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              cursor: "pointer",
              marginBottom: "10px",
              background:
                method === "upi"
                  ? "#f0f8ff"
                  : "#fff",
            }}
          >
            📱 UPI Payment
          </div>

          <div
            onClick={() => setMethod("cod")}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              cursor: "pointer",
              background:
                method === "cod"
                  ? "#f0f8ff"
                  : "#fff",
            }}
          >
            💵 Cash on Delivery
          </div>
        </div>

        {/* Payment Form */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          {method === "card" && (
            <>
              <h3>Card Details</h3>

              <input
                type="text"
                placeholder="Card Number"
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Card Holder Name"
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                style={inputStyle}
              />
            </>
          )}

          {method === "upi" && (
            <>
              <h3>UPI Payment</h3>

              <input
                type="text"
                placeholder="example@upi"
                style={inputStyle}
              />
            </>
          )}

          {method === "cod" && (
            <>
              <h3>Cash on Delivery</h3>

              <p>
                Pay when your order is
                delivered to your doorstep.
              </p>
            </>
          )}

          <button
            onClick={placeOrder}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              background: "#ffb300",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Price Details */}
      <div
        style={{
          flex: 1,
          background: "#f5f8ff",
          width: isMobile ? "100%" : "auto",
          borderRadius: "10px",
          padding: "20px",
          height: "fit-content",
          border: "1px solid #ddd",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>
          Price Details
        </h3>

        <div style={rowStyle}>
          <span>
            MRP (incl. of all taxes)
          </span>

          <span>₹{mrp}</span>
        </div>

        <div style={rowStyle}>
          <span>Platform Fee</span>

          <span>₹{platformFee}</span>
        </div>

        <hr />

        <h4 style={{ marginTop: "15px" }}>
          Offers
        </h4>

        <div
          style={{
            ...rowStyle,
            color: "green",
          }}
        >
          <span>
            First Order Discount (20%)
          </span>

          <span>
            -₹{firstOrderDiscount}
          </span>
        </div>

        <hr />

        <div
          style={{
            ...rowStyle,
            fontSize: isMobile ? "18px" : "22px",
            fontWeight: "bold",
            color: "#1a77e8",
          }}
        >
          <span>Total Amount</span>

          <span>₹{finalAmount}</span>
        </div>

        <div
          style={{
            marginTop: "20px",
            background: "#e8f5e9",
            color: "#2e7d32",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          🎉 First Order Offer Applied!
          You saved ₹
          {firstOrderDiscount}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "15px",
};

export default Payment;