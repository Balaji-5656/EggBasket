const bcrypt = require("bcryptjs");
const DeliveryPartner = require("../models/DeliveryPartner");
const DeliveryArea = require("../models/DeliveryArea");
const Order = require("../models/Order");

// ==========================================
// 1. DELIVERY PARTNER MANAGEMENT
// ==========================================

// Get all delivery partners
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await DeliveryPartner.find().sort({ createdAt: -1 });
    res.status(200).json(partners);
  } catch (error) {
    console.error("GET PARTNERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch delivery partners.", error: error.message });
  }
};

// Create a new delivery partner (Admin)
exports.createPartner = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "Name, mobile number, and password are required." });
    }

    const trimmedPhone = phone.trim();

    // Check if partner phone already exists
    const existingPartner = await DeliveryPartner.findOne({ phone: trimmedPhone });
    if (existingPartner) {
      return res.status(400).json({ message: "A partner with this mobile number already exists." });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const partner = new DeliveryPartner({
      name: name.trim(),
      email: email ? email.trim() : "",
      phone: trimmedPhone,
      password: hashedPassword,
      status: "Active",
    });

    await partner.save();

    res.status(201).json({
      message: "Delivery partner registered successfully.",
      partner: {
        _id: partner._id,
        name: partner.name,
        phone: partner.phone,
        email: partner.email,
        status: partner.status,
      },
    });
  } catch (error) {
    console.error("CREATE PARTNER ERROR:", error);
    res.status(500).json({ message: "Failed to create delivery partner.", error: error.message });
  }
};

// Toggle delivery partner active/inactive status
exports.togglePartnerStatus = async (req, res) => {
  try {
    const { partnerId } = req.params;

    const partner = await DeliveryPartner.findById(partnerId);
    if (!partner) {
      return res.status(404).json({ message: "Delivery partner not found." });
    }

    partner.status = partner.status === "Active" ? "Inactive" : "Active";
    await partner.save();

    res.status(200).json({
      message: `Partner status updated to ${partner.status}`,
      partner,
    });
  } catch (error) {
    console.error("TOGGLE PARTNER STATUS ERROR:", error);
    res.status(500).json({ message: "Failed to update partner status.", error: error.message });
  }
};

// Admin Reset Partner Password
exports.resetPartnerPassword = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.trim().length < 4) {
      return res.status(400).json({ message: "Password must be at least 4 characters long." });
    }

    const hashedPassword = await bcrypt.hash(newPassword.trim(), 10);

    const partner = await DeliveryPartner.findByIdAndUpdate(
      partnerId,
      { password: hashedPassword },
      { new: true }
    );

    if (!partner) {
      return res.status(404).json({ message: "Delivery partner not found." });
    }

    res.status(200).json({ message: `Password reset successfully for ${partner.name}.` });
  } catch (error) {
    console.error("RESET PARTNER PASSWORD ERROR:", error);
    res.status(500).json({ message: "Failed to reset partner password.", error: error.message });
  }
};

// ==========================================
// 2. ORDER ASSIGNMENTS
// ==========================================

// Get all unassigned orders
exports.getUnassignedOrders = async (req, res) => {
  try {
    const unassignedOrders = await Order.find({
      $or: [
        { deliveryPartner: { $exists: false } },
        { deliveryPartner: null },
      ],
      status: { $nin: ["Delivered", "Cancelled"] },
    })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json(unassignedOrders);
  } catch (error) {
    console.error("GET UNASSIGNED ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch unassigned orders.", error: error.message });
  }
};

// Manually assign order to delivery partner (Fixed using findByIdAndUpdate)
exports.assignOrderToPartner = async (req, res) => {
  try {
    const { orderId, deliveryPartnerId } = req.body;

    if (!orderId || !deliveryPartnerId) {
      return res.status(400).json({ message: "Order ID and Delivery Partner ID are required." });
    }

    const partner = await DeliveryPartner.findById(deliveryPartnerId);
    if (!partner) {
      return res.status(404).json({ message: "Delivery partner not found." });
    }

    if (partner.status !== "Active") {
      return res.status(400).json({ message: "Cannot assign to an inactive partner." });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Safely update delivery assignment without triggering schema re-validation errors on legacy orders
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          deliveryPartner: partner._id,
          deliveryStatus: "Assigned",
        },
        $push: {
          statusHistory: {
            status: "Assigned",
            timestamp: new Date(),
          },
        },
      },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      message: `Order successfully assigned to ${partner.name}.`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("ASSIGN ORDER ERROR:", error);
    res.status(500).json({ message: "Failed to assign order.", error: error.message });
  }
};

// ==========================================
// 3. VILLAGE DELIVERY AREA CONFIGURATION
// ==========================================

// Get active village delivery area configuration
exports.getVillageConfig = async (req, res) => {
  try {
    let config = await DeliveryArea.findOne({ isActive: true });
    
    // Fallback if no config document created yet
    if (!config) {
      config = await DeliveryArea.findOne();
    }

    res.status(200).json(config || {});
  } catch (error) {
    console.error("GET VILLAGE CONFIG ERROR:", error);
    res.status(500).json({ message: "Failed to fetch village configuration.", error: error.message });
  }
};

// Create or Update village delivery area configuration
exports.saveVillageConfig = async (req, res) => {
  try {
    const { villageName, district, state, pincodes } = req.body;

    if (!villageName || !district || !state || !pincodes) {
      return res.status(400).json({ message: "All village boundary fields are required." });
    }

    const pincodeArray = Array.isArray(pincodes)
      ? pincodes.map((p) => p.toString().trim())
      : pincodes.split(",").map((p) => p.trim()).filter(Boolean);

    // Update existing active document or insert new single configuration document
    let config = await DeliveryArea.findOne();

    if (config) {
      config.villageName = villageName.trim();
      config.district = district.trim();
      config.state = state.trim();
      config.pincodes = pincodeArray;
      config.isActive = true;
      await config.save();
    } else {
      config = new DeliveryArea({
        villageName: villageName.trim(),
        district: district.trim(),
        state: state.trim(),
        pincodes: pincodeArray,
        isActive: true,
      });
      await config.save();
    }

    res.status(200).json({
      message: "Village delivery configuration saved successfully.",
      config,
    });
  } catch (error) {
    console.error("SAVE VILLAGE CONFIG ERROR:", error);
    res.status(500).json({ message: "Failed to save village configuration.", error: error.message });
  }
};