const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// transactions  => field => ['name', 'type', 'amount', 'date']
const TransactionSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Please enter a description for the transaction']
    },
    type: {
        type: String,
        required: [true, 'Please select the type of transaction']
    },
    amount: {
        type: Number,
        required: [true, 'Please enter an amount for the transaction']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Transaction', TransactionSchema)
