var expenseController = function(Expense){

    var post = function(req, res){
        // create a new expense object from the posted data
        var expense = new Expense(req.body);
        if(!req.body.type){
            res.status(400);
            res.send('Expense type is required.');
        }
        else{
            // save the expense
            expense.save();
            // return 201 (created) and the newly created expense instance
            res.status(201);
            res.send(expense);
        }
    };

    var get = function(req, res){
        // note: you can just do var query = req.query and pass that in (and it will work), but will
        // send any user input to the database as long as it's in the params
        // This is a cleaner way of passing in the parameters
        var query = {};
        if(req.query.type){
            query.type = req.query.type;
        }
        // finds the set of expenses matching the query and sends them back as JSON
        Expense.find(query, function(err, expenses){
            if(err){
                res.status(500).send(err);
            }
            else{
                // add hypermedia
                var returnExpenses = [];
                expenses.forEach(function(element, index, array){
                    var newExpense = element.toJSON();
                    newExpense.links = {};
                    newExpense.links.self = 'http://' + req.headers.host + '/api/expenses/' + newExpense._id;
                    returnExpenses.push(newExpense);
                });
                res.json(returnExpenses);
            }
        });
    };

    return {
        post: post,
        get: get
    };
};

module.exports = expenseController;