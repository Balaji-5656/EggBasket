const express = require("express");

const {
  saveAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

const router = express.Router();

router.post("/", saveAddress);

router.get("/", getAddresses);

router.put("/:id", updateAddress);

router.delete("/:id", deleteAddress);

module.exports = router;