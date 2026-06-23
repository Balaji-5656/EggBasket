import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const isMobile = window.innerWidth <= 768;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders");
    }
  };

  return (
    <div
  style={{
    padding: isMobile ? "1rem" : "2rem",
  }}
>
      <h1>📦 All Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Found.</p>
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

            <p>
              <strong>Customer:</strong>{" "}
              {order.user?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.user?.email}
            </p>

            <p>
              <strong>Total:</strong> ₹
              {order.totalAmount}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod}
            </p>

            <div style={{ marginBottom: "15px" }}>
  <strong>Status:</strong>

  <select
    value={order.orderStatus}
    onChange={async (e) => {
      try {
        await axios.put(
          `http://localhost:5000/api/orders/${order._id}/status`,
          {
            orderStatus: e.target.value,
          }
        );

        fetchOrders();

      } catch (error) {
        console.error(error);

        alert("Failed to update status");
      }
    }}
   style={{
  marginLeft: isMobile ? "0" : "10px",
  marginTop: isMobile ? "10px" : "0",
  width: isMobile ? "100%" : "auto",
  padding: "8px",
}}
  >
    <option value="Placed">
      Placed
    </option>

    <option value="Packed">
      Packed
    </option>

    <option value="Shipped">
      Shipped
    </option>

    <option value="Delivered">
      Delivered
    </option>
  </select>
</div>

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

            {order.address && (
              <>
                <h4>Address:</h4>

                <p>
                  {order.address.fullName}
                </p>

                <p>
                  {order.address.houseNo},{" "}
                  {order.address.street}
                </p>

                <p>
                  {order.address.city},{" "}
                  {order.address.state} -{" "}
                  {order.address.pincode}
                </p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;