const DeliveryArea = require("../models/DeliveryArea");

const validateDeliveryArea = async (req, res, next) => {
  try {
    const { village, pincode } = req.body.addressDetails || req.body;

    const permittedArea = await DeliveryArea.findOne({ isActive: true });

    if (!permittedArea) {
      return res.status(400).json({ message: "Delivery area restrictions are not configured on the server." });
    }

    const isPinValid = permittedArea.pincodes.includes(pincode);
    const isVillageValid = village && village.trim().toLowerCase() === permittedArea.villageName.trim().toLowerCase();

    if (!isPinValid || !isVillageValid) {
      return res.status(403).json({
        message: `We deliver exclusively within ${permittedArea.villageName} (PIN: ${permittedArea.pincodes.join(", ")}). Orders outside this area cannot be accepted.`,
      });
    }

    req.deliveryValidation = {
      village: permittedArea.villageName,
      pincode,
      isWithinPermittedArea: true,
    };

    next();
  } catch (error) {
    console.error("Village validation error:", error);
    res.status(500).json({ message: "Server error during location validation." });
  }
};

module.exports = validateDeliveryArea;