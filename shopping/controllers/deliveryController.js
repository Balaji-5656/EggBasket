const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const DeliveryPartner = require("../models/DeliveryPartner");
const Order = require("../models/Order");

// 1. Login Partner
exports.loginPartner = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) return res.status(400).json({ message: "Mobile number and password are required." });

    const partner = await DeliveryPartner.findOne({ phone: phone.trim() });
    if (!partner) return res.status(400).json({ message: "Invalid mobile number or password." });

    const isMatch = await bcrypt.compare(password.trim(), partner.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid mobile number or password." });

    const token = jwt.sign(
      { id: partner._id, phone: partner.phone },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, partner: { id: partner._id, name: partner.name } });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

// 2. Get Partner Orders
exports.getPartnerOrders = async (req, res) => {
  try {
    const partnerId = req.user?.id;
    if (!partnerId) {
      return res.status(401).json({ message: "Unauthorized: Partner ID missing from token" });
    }

    const partnerObjectId = mongoose.Types.ObjectId.isValid(partnerId)
      ? new mongoose.Types.ObjectId(partnerId)
      : partnerId;

    const orders = await Order.find({
      $or: [
        { deliveryPartner: partnerObjectId },
        { deliveryPartner: partnerId }
      ]
    })
      .populate("user", "name email phone")
      .populate("address")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("GET PARTNER ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch assigned orders", error: error.message });
  }
};

// 3. Get Single Order Details by ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const partnerId = req.user.id;

    const partnerObjectId = mongoose.Types.ObjectId.isValid(partnerId)
      ? new mongoose.Types.ObjectId(partnerId)
      : partnerId;

    const order = await Order.findOne({
      _id: orderId,
      $or: [
        { deliveryPartner: partnerObjectId },
        { deliveryPartner: partnerId }
      ]
    })
      .populate("user", "name email phone")
      .populate("address");

    if (!order) {
      return res.status(404).json({ message: "Order not found or unauthorized access" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("GET ORDER BY ID ERROR:", error);
    res.status(500).json({ message: "Failed to fetch order details", error: error.message });
  }
};

// 4. Update Delivery Status
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryStatus } = req.body;

    const order = await Order.findOne({ 
      _id: orderId, 
      deliveryPartner: req.user.id 
    });
    
    if (!order) return res.status(404).json({ message: "Order not found." });

    order.deliveryStatus = deliveryStatus;
    if (deliveryStatus === "Delivered") {
      order.status = "Delivered";
      order.isPaid = true;
    } else if (deliveryStatus === "Failed") {
      order.status = "Cancelled";
    }

    if (!order.statusHistory) {
      order.statusHistory = [];
    }

    order.statusHistory.push({
      status: deliveryStatus,
      timestamp: new Date(),
    });

    await order.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};