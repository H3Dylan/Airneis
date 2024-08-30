import express from 'express';
import createOrderController from '../controller/order/createOrderController.js';
import getAllOrdersController from '../controller/order/getAllOrdersController.js';
import updateOrderController from '../controller/order/updateOrderController.js';
import getOrderByIdController from '../controller/order/getOrderByIdController.js';
import getOrderByDateController from '../controller/order/getOrderByDateController.js';

const router = express.Router();

router.post('/create', createOrderController);
router.get('/', getAllOrdersController);
router.put('/update/:id', updateOrderController);
router.get('/:id', getOrderByIdController); 
router.get('/date/:date', getOrderByDateController);



export default router;