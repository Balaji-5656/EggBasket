const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const DeliveryPartner = require("../models/DeliveryPartner");
const Order = require("../models/Order");

// In-memory village configuration storage
let villageBoundaryConfig = {
  villageName: "Rampur Village",
  district: "Default District",
  state: "Default State",
  pincodes: ["500001"],
};

// 1. Get Village Config
router.get("/config", (req, res) => {
  res.status(200).json(villageBoundaryConfig);
});

// 2. Save Village Config
router.post("/config", (req, res) => {
  try {
    const { villageName, district, state, pincodes } = req.body;
    villageBoundaryConfig = {
      villageName: villageName || "",
      district: district || "",
      state: state || "",
      pincodes: Array.isArray(pincodes) ? pincodes : [],
    };
    res.status(200).json({ message: "Village configuration saved successfully!", config: villageBoundaryConfig });
  } catch (error) {
    console.error("SAVE CONFIG ERROR:", error);
    res.status(500).json({ message: "Failed to save village configuration", error: error.message });
  }
});

// 3. Get Delivery Partners List
router.get("/partners", async (req, res) => {
  try {
    const partners = await DeliveryPartner.find().sort({ createdAt: -1 });
    res.status(200).json(partners);
  } catch (error) {
    console.error("FETCH PARTNERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch delivery partners", error: error.message });
  }
});

// 4. Create New Delivery Partner
router.post("/partners", async (req, res) => {
  try {
    const { name, phone, password, email } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "Name, mobile number, and password are required." });
    }

    const cleanPhone = String(phone).trim();
    const cleanPassword = String(password).trim();
    const cleanName = String(name).trim();

    // Check duplicate phone number
    const existing = await DeliveryPartner.findOne({ phone: cleanPhone });
    if (existing) {
      return res.status(400).json({ message: "A delivery partner with this mobile number already exists." });
    }

    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    const partnerData = {
      name: cleanName,
      phone: cleanPhone,
      password: hashedPassword,
      status: "Active",
    };

    if (email && String(email).trim() !== "") {
      partnerData.email = String(email).trim();
    }

    const newPartner = new DeliveryPartner(partnerData);
    await newPartner.save();

    res.status(201).json({ message: "Delivery partner created successfully!", partner: newPartner });
  } catch (error) {
    console.error("CREATE PARTNER ERROR:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Mobile number or email already exists in database." });
    }
    res.status(500).json({ message: error.message || "Failed to create partner account." });
  }
});

// 5. Toggle Partner Status (Active/Inactive)
router.put("/partners/:id/toggle", async (req, res) => {
  try {
    const partner = await DeliveryPartner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found." });

    partner.status = partner.status === "Active" ? "Inactive" : "Active";
    await partner.save();

    res.status(200).json({ message: "Partner status updated successfully", partner });
  } catch (error) {
    console.error("TOGGLE PARTNER ERROR:", error);
    res.status(500).json({ message: "Failed to toggle partner status", error: error.message });
  }
});

// 6. Get Unassigned Orders
router.get("/unassigned-orders", async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ deliveryPartner: { $exists: false } }, { deliveryPartner: null }],
      orderStatus: { $nin: ["Cancelled", "Delivered"] },
    })
      .populate("user", "name email phone")
      .populate("address")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("UNASSIGNED ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch unassigned orders", error: error.message });
  }
});

// 7. Assign Order to Partner
router.post("/assign", async (req, res) => {
  try {
    const { orderId, deliveryPartnerId } = req.body;
    if (!orderId || !deliveryPartnerId) {
      return res.status(400).json({ message: "Order ID and Delivery Partner ID are required." });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found." });

    order.deliveryPartner = deliveryPartnerId;
    order.orderStatus = "Shipped";
    order.deliveryStatus = "Out for Delivery";

    if (!order.statusHistory) order.statusHistory = [];
    order.statusHistory.push({
      status: "Assigned to Delivery Partner",
      timestamp: new Date(),
    });

    await order.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Order successfully assigned to delivery partner!" });
  } catch (error) {
    console.error("ASSIGN ORDER ERROR:", error);
    res.status(500).json({ message: "Failed to assign order.", error: error.message });
  }
});

module.exports = router;