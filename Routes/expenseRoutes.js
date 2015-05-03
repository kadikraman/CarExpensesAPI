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

    /**
     * Middleware. Gets executed just before the request is passed onto the router.
     * Used as a tool to minimize code duplication, e.g. since all of the requests require getting
     * the expense from the BD by id, instead of writing the same findById() code many times, write
     * it once in this middleware function and then pass it in the router.
     * Note: you can chain middleware.
     */
    expenseRouter.use('/:expenseId', function(req, res, next){
        Expense.findById(req.params.expenseId, function(err, expense){
            if (err){
                res.status(500).send(err);
            }
            else if (expense){
                req.expense = expense;
                next();
            }
            else{
                // if the book is not found, send a 404 (and the request will never go downstream)
                res.status(404).send('No expense found');
            }
        })
    });

    expenseRouter.route('/:expenseId')
        .get(function(req, res){
            res.json(req.expense);
        })
        .put(function(req, res){
            req.expense.type = req.body.type;
            req.expense.cost = req.body.cost;
            req.expense.mileage = req.body.mileage;
            req.expense.comment = req.body.comment;
            req.expense.litres = req.body.litres;
            req.expense.date = req.body.date;
            req.expense.save(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.json(req.expense);
                }
            });
        })
        .patch(function(req, res){
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

        })
        .delete(function(req, res){
            req.expense.remove(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return expenseRouter;
};

module.exports = routes;