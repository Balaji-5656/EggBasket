const mongoose = require('mongoose');

const deliveryPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    sparse: true, 
    default: undefined,
    set: v => (v === "" ? undefined : v) 
  },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },
  status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' },
  incentiveBalance: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('DeliveryPartner', deliveryPartnerSchema);