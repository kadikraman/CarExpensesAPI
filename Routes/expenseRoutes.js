var express = require('express');

/**
 * Routes for the expenses module
 * @param Expense
 * @returns {*}
 */
var routes = function(Expense){
    var expenseRouter = express.Router();

    // use a controller to encapsulate the code and make it testable
    var expenseController = require('../controllers/expenseController')(Expense);

    expenseRouter.route('/')
        .post(expenseController.post)
        .get(expenseController.getAll);

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
                // if the expense is not found, send a 404 (and the request will never go downstream)
                res.status(404).send('No expense found');
            }
        })
    });

    expenseRouter.route('/:expenseId')
        .get(expenseController.getOne)
        .put(expenseController.put)
        .patch(expenseController.patch)
        .delete(expenseController.delete);

    return expenseRouter;
};

module.exports = routes;