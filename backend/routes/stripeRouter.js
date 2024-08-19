import express from 'express';
import createPaymentController from "../controller/stripe/createPaymentController.js";

const router = express.Router();

router.post("/create_payment", createPaymentController);

export default router;