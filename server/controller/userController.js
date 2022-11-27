const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

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

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
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

//Generate Token
const generateToken = (id) => { 
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// //  post: http://localhost:5001/api/transaction
// const create_Transaction = async (req, res) => {
//     if(!req.body) return res.status(400).json('Post HTTP Data not Provided')
//     let { description, type, amount } = req.body

//     const create = await new model.Transaction({
//             description,
//             type,
//             amount,
//             date: new Date()
//         })

//     create.save()
//         .then((result) => {
//             res.status(201).send({
//             message: 'Transaction Created Successfully',
//             result,
//             })
//         })
//         .catch((error) => {
//             res.status(500).send({
//             message: 'Error creating transaction',
//             error,
//             })
//         })

// }

// //  get: http://localhost:5001/api/transaction
// const get_Transaction = async (req, res) => { 

//     await model.Transaction.find()
//         .then((result) => { 
//             res.status(201).send({
//                 message: 'Transaction Data retrieved successfully',
//                 result
//             })
//         })
//         .catch((error) => { 
//             res.status(500).send({
//                 message: 'Failed to get Transaction Data',
//                 error,
//             })
//         })
// }

// //  delete: http://localhost:5001/api/transaction
// const delete_Transaction = async (req, res) => {
//     if (!req.body) return res.status(400).json({ message: 'Request Body Not Found' })

//     await model.Transaction.deleteOne(req.body)
//         .then((result) => { 
//             res.status(201).send({
//                 message: 'Transaction deleted succssfully',
//                 result
//             })
//         })
//         .catch((error) => { 
//             res.status(500).send({
//                 message: 'Failed to delete Transaction',
//                 error
//             })
//         })
//     // await model.Transaction.deleteOne(req.body, function (err) {
//     //     if (!err) return res.json('Record Deleted')
//     // }).clone().catch(function (err) { 
//     //     return res.json('Error while deleting Transaction record')
//     // } )
// }

// // post: http://localhost:5001/api/register
// const register_User = async (req, res) => {
//     if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
//     let { name, email, password } = req.body;

//     await model.User.findOne({ email: email })
//         .then((user) => { 
//             if (user) {
//                 res.status(400).send({
//                     message: 'Email alreadt exists',
//                     user
//                 })
//             } else { 

//                 bcrypt
//                     .hash(password, 10)
//                     .then((hashedPassword) => {
//                        const user = new model.User({
//                        name,
//                        email,
//                        password: hashedPassword,
//                        });
           
//                         user
//                             .save()
//                             .then((result) => {
//                                res.status(201).send({
//                                message: 'User Created Successfully',
//                                result,
//                                })
//                             })
//                             .catch((error) => {
//                                res.status(500).send({
//                                message: 'Error creating user',
//                                error,
//                                })
//                            })
//                    })
//             }
//         })
//         .catch((e) => {
//             res.status(500).send({
//             message: 'Password was not hashed successfully',
//             e,
//             })
//         })

// }

// // post: http://localhost:5001/api/login
// const login_User = async (req, res) => { 
//     if(!req.body) return res.status(400).json('Post HTTP Data not Provided')
//     let { email, password } = req.body

//     await model.User.findOne({ email: email })
//         .then((user) => {
//             // compare the password entered and the hashed password found
//             bcrypt
//                 .compare(password, user.password)
//                 // if the passwords match
//                 .then((passwordCheck) => {

//                     // check if password matches
//                     if(!passwordCheck) {
//                     return res.status(400).send({
//                         message: 'Passwords does not match',
//                         error,
//                     })
//                     }

//                     // create JWT token
//                     const token = jwt.sign({
//                         userId: user._id,
//                         userEmail: user.email,
//                     },
//                     'RANDOM-TOKEN',
//                     { expiresIn: '24h' }
//                     )

//                     // return success response
//                     res.status(200).send({
//                     message: 'Login Successful',
//                     email: user.email,
//                     token,
//                     })
//                 })
//             // catch error if password does not match
//             .catch((error) => {
//                 res.status(400).send({
//                 message: 'Passwords does not match',
//                 error,
//                 })
//             })
//         })
//     // catch error if email does not exist
//     .catch((e) => {
//         res.status(404).send({
//         message: 'Email not found',
//         e,
//         })
//     })
// }

module.exports = {
    register_User,
    login_User,
    get_User,
    // create_Transaction,
    // get_Transaction,
    // delete_Transaction,
}