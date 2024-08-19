import express from 'express';
import getUserController from "../controller/user/getUserController.js";
import updateShippingAddressController from "../controller/user/shipping_address/updateShippingAddressController.js";
import getCreditCardController from "../controller/user/credit_card/getCreditCardController.js";

const router = express.Router();

router.get("/:id", getUserController);

export default router;
