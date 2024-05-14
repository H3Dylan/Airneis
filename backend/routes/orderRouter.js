const express = require('express');
const router = express.Router();

const createOrderController = require('../controller/order/createOrderController');

router.post('/', createOrderController);

module.exports = router;