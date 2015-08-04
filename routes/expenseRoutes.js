var express = require('express');

/**
 * Routes for the expenses module
 * @param Expense
 * @returns {*}
 */
var routes = function(Expense, config){
    var expenseRouter = express.Router();

    // use a controller to encapsulate the code and make it testable
    var expenseController = require('../controllers/expenseController')(Expense);

    /**
     * Checks if the request is authorized.
     * If the request is not authorized, returns 401 (unauthorized) if a put/patch/delete is called.
     */
    expenseRouter.use('/', function(req, res, next){
        if(req.method == 'POST' || req.method == 'PUT' || req.method == 'PATCH' || req.method == 'DELETE'){
            if(req.headers.authorization){
                if(req.headers.authorization == config['key']){
                    next();
                }
                else{
                    res.status(401).send('You are not authorized to edit the database.');
                }
            }
            else{
                res.status(401).send('You are not authorized to edit the database.');
            }
        }
        else{
            next();
        }
    });

    /**
    * Adds the CORS header
    */
    expenseRouter.use('/', use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

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
        });
    });

    expenseRouter.route('/:expenseId')
        .get(expenseController.getOne)
        .put(expenseController.put)
        .patch(expenseController.patch)
        .delete(expenseController.delete);

    return expenseRouter;
};

module.exports = routes;
