import express from 'express';
import createOrderController from '../controller/order/createOrderController.js';

const router = express.Router();

router.post('/', createOrderController);

export default router;