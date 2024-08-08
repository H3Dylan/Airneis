const express = require("express");
const router = express.Router();

const createPaymentController = require("../controller/stripe/createPaymentController");

router.post("/create_payment", createPaymentController);

module.exports = router;