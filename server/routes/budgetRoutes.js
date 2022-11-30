const express = require('express')
const router = express.Router()
const {
    get_Budget,
    set_Budget,} = require('../controller/budgetController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, get_Budget).post(protect, set_Budget)


module.exports = router;