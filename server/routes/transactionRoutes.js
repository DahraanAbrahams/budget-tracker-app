const express = require('express')
const router = express.Router()
const {
    get_Transactions,
    set_Transaction,
    delete_Transaction } = require('../controller/transactionController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, get_Transactions).post(protect, set_Transaction)
router.route('/:id').delete(protect, delete_Transaction)

module.exports = router;