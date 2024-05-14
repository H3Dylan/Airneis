const express = require('express');
const router = express.Router();

const userRegisterController = require('../controller/auth/userRegister');
const userLoginController = require('../controller/auth/userLogin');

router.post('/register', userRegisterController);
router.post('/login', userLoginController);

module.exports = router;