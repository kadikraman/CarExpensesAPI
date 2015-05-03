var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var expenseModel = new Schema({
    type: {
        type: String
    },
    cost: {
        type: Number
    },
    mileage: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String
    },
    litres: {
        type: Number
    }
});

module.exports = mongoose.model('Expense', expenseModel);