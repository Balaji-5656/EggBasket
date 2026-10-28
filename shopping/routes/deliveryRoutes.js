const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");
const verifyDeliveryToken = require("../middleware/deliveryAuth");

// Authentication Route
router.post("/auth/login", deliveryController.loginPartner);

// Get All Assigned Orders
router.get("/orders", verifyDeliveryToken, deliveryController.getPartnerOrders);

// Get Single Order Detail by ID
router.get("/orders/:orderId", verifyDeliveryToken, deliveryController.getOrderById);

// Update Delivery Status (Accepted, Picked Up, Delivered, etc.)
router.put("/orders/:orderId/status", verifyDeliveryToken, deliveryController.updateDeliveryStatus);

module.exports = router;