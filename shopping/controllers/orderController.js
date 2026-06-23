
const Order = require("../models/Order");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      address,
      paymentMethod,
      totalAmount,
    } = req.body;

    const order = await Order.create({
      user,
      items,
      address,
      paymentMethod,
      totalAmount,
    });

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
      message:
        "Order status updated successfully",
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
