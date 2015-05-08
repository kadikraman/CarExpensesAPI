/**
 * Controller to handle all Expenses requests
 * @param Expense
 * @returns {{get: Function, put: Function, patch: Function, delete: Function}}
 */
var expenseController = function(Expense){

    /**
     * Returns all expenses matching the particular query params
     */
    var getAll = function(req, res){
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

    /**
     * Adds a new expense
     */
    var post = function(req, res){
        // create a new expense object from the posted data
        var expense = new Expense(req.body);
        if(!req.body.type){
            res.status(400);
            res.send('Expense type is required.');
        }
        else if(!req.body.cost){
            res.status(400);
            res.send('Expense cost is required.');
        }
        else if(!req.body.date){
            res.status(400);
            res.send('Expense date is required.');
        }
        else{
            // save the expense
            expense.save();
            // return 201 (created) and the newly created expense instance
            res.status(201);
            res.send(expense);
        }
    };

    /**
     * Returns one expense
     */
    var getOne = function(req, res){
        // add hypermedia links
        var returnExpense = req.expense.toJSON();
        returnExpense.links = {};
        var newLink = 'http://' + req.headers.host + '/api/expenses/?type=' + returnExpense.type;
        returnExpense.links.FilterByThisType = newLink.replace(' ', '%20');

        res.json(returnExpense);
    };

    var put = function(req, res){
        if(!req.body.type){
            res.status(400);
            res.send('Expense type is required (use Patch to edit a singe field).');
        }
        else if(!req.body.cost){
            res.status(400);
            res.send('Expense cost is required (use Patch to edit a singe field).');
        }
        else if(!req.body.date){
            res.status(400);
            res.send('Expense date is required (use Patch to edit a singe field).');
        }
        else {
            req.expense.type = req.body.type;
            req.expense.cost = req.body.cost;
            req.expense.mileage = req.body.mileage;
            req.expense.comment = req.body.comment;
            req.expense.litres = req.body.litres;
            req.expense.date = req.body.date;
            req.expense.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(req.expense);
                }
            });
        }
    };

    /**
     * Allows modifying part of a single existing expense
     */
    var patch = function(req, res){
        if(req.body._id){
            // we do not want to allow the user to update the id
            delete req.body._id;
        }
        for(var p in req.body){
            req.expense[p] = req.body[p];
        }
        req.expense.save(function(err){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.json(req.expense);
            }
        });

    };

    /**
     * Deletes the selected expense
     */
    var delete_item = function(req, res){
        req.expense.remove(function(err){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(204).send('Removed');
            }
        });
    };

    return {
        getAll: getAll,
        post: post,
        getOne: getOne,
        put: put,
        patch: patch,
        delete: delete_item
    }
};

module.exports = expenseController;
