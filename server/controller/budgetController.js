const Budget = require('../models/budgetModel')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


// @desc    Get budget
// @route   POST /api/budget
// @access  Private 
const get_Budget = asyncHandler(async (req, res) => { 
    const budget = await Budget.find({user: req.user.id})

    res.status(200).json(budget)
})

// @desc    Set budget
// @route   POST /api/budget
// @access  Private
const set_Budget = asyncHandler(async (req, res) => {
    // const { amount } = req.body
    console.log('From backend: ' + req.body)
    if (!req.body) {
        res.status(400)
        throw new Error('Please set the budget') //Express error handler
    }
  
    const budget = await Budget.findOneAndUpdate(
        {
            user: req.user.id
        },
        {
            amount: amount
        },
        {
            upsert: true,
            new: true
        }
    )
  
    if (budget) {
        res.status(201).json({
            message: 'Budget Added Successfully',
            budget
        })
    } else {
        res.status(500)
        throw new Error('Error creating budget')
        
    }
})

// // @desc    Update budget
// // @route   PUT /api/budget
// // @access  Private
// const update_Budget = asyncHandler(async (req, res) => {
//     const budget = await Budget.findById(req.params.id)

//     if (!budget) { 
//         res.status(400)
//         throw new Error('Budget not found')
//     }

//     const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true })
    
//     res.status(200).json(updatedBudget)
// })
  
module.exports = {
    get_Budget,
    set_Budget,
    // update_Budget
}