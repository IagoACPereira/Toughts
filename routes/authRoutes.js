const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

// Controller
router.get('/login', AuthController.login)
router.get('/register', AuthController.register)

module.exports = router