const Address = require("../models/Address");

// Save Address
const saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);

    res.status(201).json({
      message: "Address saved successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Addresses
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Address
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Address
const deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
};