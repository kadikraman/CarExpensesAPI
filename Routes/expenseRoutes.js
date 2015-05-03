var express = require('express');

/**
 * Routes for the expenses module
 * @param Expense
 * @returns {*}
 */
var routes = function(Expense){
    var expenseRouter = express.Router();

    expenseRouter.route('/')
        .post(function(req, res){
            // create a new expense object from the posted data
            var expense = new Expense(req.body);
            // save the expense
            expense.save();
            // return 201 (created) and the newly created expense instance
            res.status(201).send(expense);

        })
        .get(function(req, res){
            // note: you can just do var query = req.query and pass that in (and it will work), but will
            // send any user input to the database as long as it's in the params
            // This is a cleaner way of passing in the paramaters
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
                    res.json(expenses);
                }
            });
        });

    expenseRouter.route('/:expenseId')
        .get(function(req, res){
            Expense.findById(req.params.expenseId, function(err, expense){
                if (err){
                    res.status(500).send(err);
                }
                else{
                    res.json(expense);
                }
            })
        });
    return expenseRouter;
};

module.exports = routes;