const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// Place Order
router.post("/", placeOrder);
router.get("/", getAllOrders);
// Get Orders by User
router.put("/:id/status", updateOrderStatus);
router.get("/:userId", getUserOrders);

module.exports = router;