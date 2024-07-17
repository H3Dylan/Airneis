const express = require("express");
const router = express.Router();

const getUserController = require("../controller/user/getUserController");
const updateShippingAddressController = require("../controller/user/shipping_address/updateShippingAddressController");
const getCreditCardController = require("../controller/user/credit_card/getCreditCardController");

router.get("/:id", getUserController);

module.exports = router;
