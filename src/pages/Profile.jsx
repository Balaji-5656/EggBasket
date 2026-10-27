import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const addresses =
    JSON.parse(localStorage.getItem("addresses")) || [];

  const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  const eggsCount = orders.reduce(
    (total, order) =>
      total +
      (order.items?.reduce(
        (sum, item) => sum + item.quantity,
        0
      ) || 0),
    0
  );

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: formData.name,
      phone: formData.phone,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("✅ Profile Updated Successfully!");

    window.location.reload();
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "20px auto",
        padding: isMobile ? "15px" : "25px",
        boxSizing: "border-box",
      }}
    >
      {/* Welcome Card */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "20px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            color: "#FF6F00",
          }}
        >
          👋 Welcome Back, {user?.name}
        </h1>

        <p
          style={{
            color: "#666",
          }}
        >
          Manage your EggBasket account,
          orders, wishlist and addresses.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <StatCard
          title="📦 Orders"
          value={orders.length}
        />

        <StatCard
          title="❤️ Wishlist"
          value={wishlist.length}
        />

        <StatCard
          title="📍 Addresses"
          value={addresses.length}
        />

        <StatCard
          title="🥚 Eggs Ordered"
          value={eggsCount}
        />
      </div>

      {/* Quick Actions */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "20px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2>⚡ Quick Actions</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <button
            style={actionBtn}
            onClick={() =>
              navigate("/my-orders")
            }
          >
            📦 My Orders
          </button>

          <button
            style={actionBtn}
            onClick={() =>
              navigate("/wishlist")
            }
          >
            ❤️ Wishlist
          </button>

          <button
            style={actionBtn}
            onClick={() =>
              navigate("/saved-addresses")
            }
          >
            📍 Addresses
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "20px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2>📦 Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No Orders Yet</p>
        ) : (
          orders.slice(0, 3).map((order, index) => (
            <div
              key={index}
              style={{
                borderBottom:
                  "1px solid #eee",
                padding: "10px 0",
              }}
            >
              <p>
                <strong>Total:</strong> ₹
                {order.totalAmount}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.orderStatus}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Address */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "20px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2>📍 Default Address</h2>

        {addresses.length === 0 ? (
          <p>No Address Saved</p>
        ) : (
          <>
            <p>
              {addresses[0]?.fullName}
            </p>

            <p>
              {addresses[0]?.city},{" "}
              {addresses[0]?.state}
            </p>
          </>
        )}
      </div>

      {/* Edit Profile */}
      <div
        style={{
          background: "#fff",
          padding: isMobile
            ? "20px"
            : "30px",
          borderRadius: "15px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          👤 Edit Profile
        </h2>

        <div>
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={formData.email}
            readOnly
            style={{
              ...inputStyle,
              background: "#f5f5f5",
            }}
          />
        </div>

        <div>
          <label>Phone Number</label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#FF6F00",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h4>{title}</h4>

      <h2
        style={{
          color: "#FF6F00",
          margin: 0,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

const actionBtn = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  background: "#FF6F00",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxSizing: "border-box",
};

export default Profile;