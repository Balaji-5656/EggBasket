const Order = require("../models/Order");
const DeliveryArea = require("../models/DeliveryArea"); // 👈 Added for village delivery restriction check
const transporter = require("../utils/mailer");
const User = require("../models/User");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      address,
      paymentMethod,
      totalAmount,
      village,   // 👈 Expecting village name from request body / checkout
      pincode,   // 👈 Expecting pincode from request body / checkout
    } = req.body;

    // --- 1. VILLAGE DELIVERY RESTRICTION CHECK ---
    const permittedArea = await DeliveryArea.findOne({ isActive: true });

    if (!permittedArea) {
      return res.status(400).json({ 
        message: "Delivery area restrictions are not configured on the server by the admin." 
      });
    }

    const isPinValid = permittedArea.pincodes.includes(pincode);
    const isVillageValid = village && village.trim().toLowerCase() === permittedArea.villageName.trim().toLowerCase();

    if (!isPinValid || !isVillageValid) {
      return res.status(403).json({
        message: `We currently deliver exclusively within ${permittedArea.villageName} (PIN: ${permittedArea.pincodes.join(", ")}). Orders outside this permitted village area cannot be accepted.`,
      });
    }
    // ---------------------------------------------

    // 2. Create Order with Village and Status Tracking Details
    const order = await Order.create({
      user,
      items,
      address,
      paymentMethod,
      totalAmount,
      orderStatus: "Placed",
      deliveryDetails: {
        village: permittedArea.villageName,
        pincode,
        isWithinPermittedArea: true,
      },
      statusHistory: [
        {
          status: "Placed",
          updaterModel: "System",
        },
      ],
    });

    const userData = await User.findById(user);

    if (userData && userData.email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userData.email,
        subject: "🎉 EggBasket Order Confirmed",
        html: `
          <h2>Hello ${userData.name},</h2>

          <p>Your order has been placed successfully and verified for delivery within <b>${permittedArea.villageName}</b>.</p>

          <h3>Order Details</h3>

          <p><b>Total Amount:</b> ₹${totalAmount}</p>

          <p><b>Payment Method:</b> ${paymentMethod}</p>

          <p>Thank you for shopping with <b>EggBasket 🥚</b>.</p>
        `,
      });
    }

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error(
      "PLACE ORDER ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Orders by User
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    })
      .populate("user")
      .populate("address")
      .populate("deliveryPartner") // 👈 Added population for assigned delivery partner tracking
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error(
      "GET USER ORDERS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("address")
      .populate("deliveryPartner") // 👈 Added population for admin oversight
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error(
      "GET ALL ORDERS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus,
        $push: {
          statusHistory: {
            status: orderStatus,
            updaterModel: "Admin",
          },
        },
      },
      {
        returnDocument: "after",
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    console.error(
      "STATUS UPDATE ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};