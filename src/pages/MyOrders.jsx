import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

function MyOrders() {
  const isMobile = window.innerWidth <= 768;
  const [orders, setOrders] = useState([]);
  const socket = io("https://eggbasket-backend.onrender.com");

  useEffect(() => {
    fetchOrders();

    socket.on("orderStatusUpdated", (data) => {
  setOrders((prevOrders) =>
    prevOrders.map((order) =>
      order._id === data.orderId
        ? {
            ...order,
            orderStatus: data.orderStatus,
          }
        : order
    )
  );

  alert(
    `🔔 Your order status is now ${data.orderStatus}`
  );
});
return () => {
    socket.disconnect();
  };
    
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `https://eggbasket-backend.onrender.com/api/orders/${user.id || user._id}`
      );

      setOrders(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders");
    }
  };

  return (
    <div style={{ padding: isMobile ? "1rem" : "2rem" }}>
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: isMobile ? "15px" : "20px",
              marginBottom: "20px",
            }}
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <div>
  <strong>Tracking:</strong>

  <div style={{ marginTop: "10px" }}>
    <p>
      {["Placed", "Packed", "Shipped", "Delivered"].indexOf(order.orderStatus) >= 0
        ? "✅"
        : "⬜"} Placed
    </p>

    <p>
      {["Packed", "Shipped", "Delivered"].includes(order.orderStatus)
        ? "✅"
        : "⬜"} Packed
    </p>

    <p>
      {["Shipped", "Delivered"].includes(order.orderStatus)
        ? "✅"
        : "⬜"} Shipped
    </p>

    <p>
      {order.orderStatus === "Delivered"
        ? "✅"
        : "⬜"} Delivered
    </p>
  </div>
</div>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>Total:</strong> ₹
              {order.totalAmount}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>

            <h4>Products:</h4>

            {order.items.map((item, index) => (
              <div
                key={index}
                style={{
                  marginLeft: isMobile ? "0" : "20px",
                  marginBottom: "10px",
                }}
              >
                <p>
                  {item.name} × {item.quantity}
                </p>

                <p>₹{item.price}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;