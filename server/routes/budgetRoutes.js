const express = require('express')
const router = express.Router()
const {
    get_Budget,
    set_Budget,
    update_Budget} = require('../controller/budgetController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, get_Budget).post(protect, set_Budget)
// router.route('/:id').put(protect, update_Budget)

module.exports = router;