const express = require('express')
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsCotroller')

// Controller
router.get('/', ToughtsController.showToughts)

module.exports = router