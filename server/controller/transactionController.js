const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')


// @desc    Get transactions
// @route   POST /api/transactions
// @access  Private 
const get_Transactions = asyncHandler(async (req, res) => { 
    const transactions = await Transaction.find({user: req.user.id})

    res.status(200).json(transactions)
})

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const set_Transaction = asyncHandler(async (req, res) => {
    const { description, type, amount } = req.body

    if (!description || !type || !amount) {
        res.status(400)
        throw new Error('Please add all fields')
    }
  
    const transaction = await Transaction.create({
        description,
        type,
        amount,
        user: req.user.id
    })
  
    if (transaction) {
        res.status(201).json({
            message: 'Transaction Created Successfully',
            transaction
        })
    } else {
        res.status(500)
        throw new Error('Error creating transaction')
        
    }
})
  
// @desc    Delete transaction
// @route   DELETE /api/transaction/:id
// @access  Private
const delete_Transaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id)
  
    if (!transaction) {
      res.status(400)
      throw new Error('Transaction not found')
    }
  
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    if (transaction.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    await transaction.remove()
  
    res.status(200).json({ id: req.params.id })
})
  
module.exports = {
    get_Transactions,
    set_Transaction,
    delete_Transaction 
}