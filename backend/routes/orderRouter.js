// src/router/orderRouter.js
const express = require('express');
const router = express.Router();

const createOrderController = require('../controller/order/createOrderController');
const getAllOrdersController = require('../controller/order/getAllOrdersController');
const updateOrderController = require('../controller/order/updateOrderController');
const getOrderByIdController = require('../controller/order/getOrderByIdController');
const getOrderByDayController = require('../controller/order/getOrderByDayController');
const getOrderByWeekController = require('../controller/order/getOrderByWeekController');

router.post('/create', createOrderController);
router.get('/', getAllOrdersController);
router.put('/update/:id', updateOrderController);
router.get('/:id', getOrderByIdController); 
router.get('/daily-sales', getOrderByDayController);
router.get('/weekly-sales', getOrderByWeekController);

module.exports = router;
