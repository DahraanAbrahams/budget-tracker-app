const Budget = require('../models/budgetModel')
const User = require('../models/userModel')
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
    if (!req.body) {
        res.status(400)
        throw new Error('Please set the budget') //Express error handler
    }
  
    const budget = await Budget.findOneAndUpdate(
        {
            user: req.user.id
        },
        {
            amount: req.body.budget
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
  
module.exports = {
    get_Budget,
    set_Budget,
}