const mongoose = require('mongoose')
const { isEmail } = require('validator')

const Schema = mongoose.Schema;

// users => field => ['name', 'type', 'password']
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    }, 
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
},
    {
        timestamps: true,
    }
)



module.exports = mongoose.model('User', UserSchema)
