const express = require('express')
const router = express.Router()

const userSignUpController = require('../controller/auth/userSignUp')

router.post('/signup', userSignUpController)

module.exports = router