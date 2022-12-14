const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Budget model
const BudgetSchema = new Schema({
    amount: {
        type: Number,
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

module.exports = mongoose.model('Budget', BudgetSchema)