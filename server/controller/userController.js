const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

//Trying
const Budget = require('../models/budgetModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public 
const register_User = asyncHandler(async (req, res) => { 
    const { name, email, password } = req.body

    if (!name || !email || !password) { 
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ email })
    
    if (userExists) { 
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    //Try
    const budget = await Budget.create({
        amount: 0,
        user
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            budget
        })
    } else { 
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public 
const login_User = asyncHandler(async (req, res) => { 

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) { 
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else { 
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get user data
// @route   GET /api/users/user
// @access  Private 
const get_User = asyncHandler(async (req, res) => { 
    res.status(200).json(req.user)
})

const generateToken = (id) => { 
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    register_User,
    login_User,
    get_User,
}