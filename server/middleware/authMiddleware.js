const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//The way this will be sent is in the headers. In the HTTP headers
//you have an Authorization object
const protect = asyncHandler(async (req, res, next) => { 
    let token 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { 
        try {
            //Get the token from header
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET) //(token, secrete which we stored in config.env)
            
            //Get user - token has user ID as part of payload and then assign it to req.user
            // so that we could access req.user in any route that needs to be protected 
            req.user = await User.findById(decoded.id).select('-password')
            //We passed the user ID in the generate token function so the token will include 
            //the ID. We could put anythig into the generate function and then access it here
            //We don't want the hashed password so we use .select('-password')

            next() // At the end of our middleware we want to beable to call the next piece of middleware 
        } catch (error) { 
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if (!token) { 
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
})

module.exports = { protect }