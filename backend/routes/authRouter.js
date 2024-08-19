import express from "express";
import userRegisterController from "../controller/auth/userRegister.js";
import userLoginController from "../controller/auth/userLogin.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);

export default router;
