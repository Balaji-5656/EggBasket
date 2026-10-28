const mongoose = require("mongoose");

const deliveryAreaSchema = new mongoose.Schema(
  {
    villageName: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pincodes: [{ type: String, required: true }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryArea", deliveryAreaSchema);