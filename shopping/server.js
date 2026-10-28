const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const chatRoutes = require("./routes/chatRoutes");

// --- DELIVERY ROUTE IMPORTS ---
const deliveryRoutes = require("./routes/deliveryRoutes");
const adminDeliveryRoutes = require("./routes/adminDeliveryRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Global Middleware
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Terminal Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Primary Store Routes
app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chat", chatRoutes);

// Delivery & Admin Delivery Routes
app.use("/api/delivery", deliveryRoutes);
app.use("/api/admin/delivery", adminDeliveryRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("EggBasket Backend Running...");
});

// Fallback 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});