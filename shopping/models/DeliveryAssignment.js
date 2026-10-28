const mongoose = require('mongoose');

const deliveryAssignmentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
  deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner', required: true },
  status: { 
    type: String, 
    enum: ['Assigned', 'Accepted', 'Picked Up', 'Out for Delivery', 'Delivered', 'Failed', 'Cancelled'], 
    default: 'Assigned' 
  },
  failureReason: { type: String },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, refPath: 'statusHistory.updaterModel' },
    updaterModel: { type: String, enum: ['DeliveryPartner', 'Admin', 'System'] }
  }],
  assignedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('DeliveryAssignment', deliveryAssignmentSchema);