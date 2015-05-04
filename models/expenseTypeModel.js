var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var expenseTypeModel = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('ExpenseType', expenseTypeModel);