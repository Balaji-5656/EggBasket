const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: String,
        name: String,
        image: String,
        quantity: Number,
        price: Number,
      },
    ],

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["Placed", "Accepted", "Packed", "Shipped", "Out for Delivery", "Delivered", "Failed", "Cancelled"],
      default: "Placed",
    },

    // --- NEW FIELDS FOR DELIVERY PARTNER & VILLAGE RESTRICTION ---
    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
      default: null,
    },

    deliveryDetails: {
      village: { type: String, required: true },
      pincode: { type: String, required: true },
      isWithinPermittedArea: { type: Boolean, required: true, default: false },
    },

    statusHistory: [
      {
        status: String,
        timestamp: { type: Date, default: Date.now },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, refPath: "statusHistory.updaterModel" },
        updaterModel: { type: String, enum: ["DeliveryPartner", "Admin", "System"] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);