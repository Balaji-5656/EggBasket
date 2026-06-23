import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const { cartItems, totalPrice } =
    useContext(CartContext);

  const navigate = useNavigate();

  const isMobile =
    window.innerWidth <= 768;

  const [address, setAddress] =
    useState({
      fullName: "",
      mobile: "",
      houseNo: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      addressType: "Home",
    });

  const [addressSaved, setAddressSaved] =
    useState(false);

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveAddress = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert("Please login first");
        return;
      }

      const addressData = {
        ...address,
        user: user.id || user._id,
      };

      const res = await axios.post(
        "http://localhost:5000/api/address",
        addressData
      );

      alert(res.data.message);

      setAddressSaved(true);

      localStorage.setItem(
        "latestAddress",
        JSON.stringify(res.data.address)
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to save address"
      );
    }
  };

  return (
    <div
      style={{
        padding: isMobile
          ? "1rem"
          : "2rem",
      }}
    >
      <h1>🛒 Checkout</h1>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile
            ? "column"
            : "row",
          gap: "30px",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: 2,
            width: "100%",
          }}
        >
          {/* Address */}
          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "30px",
              borderRadius: "10px",
            }}
          >
            <h2>
              📍 Delivery Address
            </h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={address.fullName}
              onChange={
                handleAddressChange
              }
              style={inputStyle}
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={address.mobile}
              onChange={
                handleAddressChange
              }
              style={inputStyle}
            />

            <input
              type="text"
              name="houseNo"
              placeholder="House No"
              value={address.houseNo}
              onChange={
                handleAddressChange
              }
              style={inputStyle}
            />

            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={
                handleAddressChange
              }
              style={inputStyle}
            />

            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={address.landmark}
              onChange={
                handleAddressChange
              }
              style={inputStyle}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={
                handleAddressChange
              }
              style={inputStyle}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={
                handleAddressChange
              }
              style={inputStyle}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={
                handleAddressChange
              }
              style={inputStyle}
            />

            <select
              name="addressType"
              value={
                address.addressType
              }
              onChange={
                handleAddressChange
              }
              style={inputStyle}
            >
              <option value="Home">
                Home
              </option>

              <option value="Office">
                Office
              </option>
            </select>

            <button
              onClick={
                handleSaveAddress
              }
              style={{
                width: "100%",
                padding: "12px",
                background:
                  "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Save Address
            </button>

            {addressSaved && (
              <p
                style={{
                  color: "green",
                  marginTop: "10px",
                  fontWeight:
                    "bold",
                }}
              >
                ✅ Address Saved
                Successfully
              </p>
            )}
          </div>

          {/* Order Summary */}
          <h2>🧾 Order Summary</h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection:
                  isMobile
                    ? "column"
                    : "row",
                gap: "20px",
                border:
                  "1px solid #ddd",
                padding: "20px",
                marginBottom: "20px",
                borderRadius:
                  "10px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                width={
                  isMobile
                    ? "80"
                    : "120"
                }
              />

              <div>
                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{item.price}
                </p>

                <p>
                  Qty:
                  {
                    item.quantity
                  }
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: 1,
            width: isMobile
              ? "100%"
              : "auto",
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
            height:
              "fit-content",
          }}
        >
          <h3>
            Price Details
          </h3>

          <p>
            Total Items:
            {cartItems.length}
          </p>

          <h2>
            ₹{totalPrice}
          </h2>

          <button
            disabled={
              !addressSaved
            }
            onClick={() =>
              navigate(
                "/payment"
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              background:
                addressSaved
                  ? "#FF6F00"
                  : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius:
                "5px",
              cursor:
                addressSaved
                  ? "pointer"
                  : "not-allowed",
              fontWeight:
                "bold",
            }}
          >
            Continue to Payment
          </button>

          {!addressSaved && (
            <p
              style={{
                color: "red",
                marginTop:
                  "10px",
                fontSize:
                  "14px",
              }}
            >
              Please save
              your address
              first.
            </p>
          )}
        </div>
      </div>
    </div>
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

export default Checkout;