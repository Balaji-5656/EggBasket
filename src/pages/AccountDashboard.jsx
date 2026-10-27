import React from "react";
import { useNavigate } from "react-router-dom";

function AccountDashboard() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const addresses =
    JSON.parse(
      localStorage.getItem("addresses")
    ) || [];

  const wishlist =
    JSON.parse(
      localStorage.getItem("wishlist")
    ) || [];

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Welcome */}
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
        <h1>
          👋 Welcome Back, {user.name}
        </h1>

        <p
          style={{
            color: "#666",
          }}
        >
          Manage your orders,
          addresses and wishlist.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <StatCard
          title="Orders"
          value={orders.length}
        />

        <StatCard
          title="Addresses"
          value={addresses.length}
        />

        <StatCard
          title="Wishlist"
          value={wishlist.length}
        />

        <StatCard
          title="Loyalty Points"
          value="320"
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
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "15px",
          }}
        >
          <button
            style={btn}
            onClick={() =>
              navigate("/my-orders")
            }
          >
            📦 My Orders
          </button>

          <button
            style={btn}
            onClick={() =>
              navigate("/wishlist")
            }
          >
            ❤️ Wishlist
          </button>

          <button
            style={btn}
            onClick={() =>
              navigate("/saved-addresses")
            }
          >
            📍 Addresses
          </button>

          <button
            style={btn}
            onClick={() =>
              navigate("/profile")
            }
          >
            👤 Edit Profile
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
          orders
            .slice(0, 3)
            .map((order) => (
              <div
                key={order._id}
                style={{
                  padding: "12px",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                <p>
                  Order Total: ₹
                  {order.totalAmount}
                </p>

                <p>
                  Status:{" "}
                  {order.orderStatus}
                </p>
              </div>
            ))
        )}
      </div>

      {/* Default Address */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2>📍 Default Address</h2>

        {addresses.length === 0 ? (
          <p>
            No Address Saved Yet
          </p>
        ) : (
          <>
            <p>
              {
                addresses[0]
                  ?.fullName
              }
            </p>

            <p>
              {
                addresses[0]
                  ?.city
              }
              ,{" "}
              {
                addresses[0]
                  ?.state
              }
            </p>

            <button
              style={{
                ...btn,
                marginTop: "10px",
              }}
              onClick={() =>
                navigate(
                  "/saved-addresses"
                )
              }
            >
              Manage Addresses
            </button>
          </>
        )}
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
      <h3>{title}</h3>

      <h1
        style={{
          color: "#FF6F00",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

const btn = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  background: "#FF6F00",
  color: "#fff",
  cursor: "pointer",
};

export default AccountDashboard;