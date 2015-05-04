var express = require('express');

var routes = function(ExpenseType){
    var expenseTypeRouter = express.Router();
    var expenseTypeController = require('../controllers/expenseTypeController')(ExpenseType);

    expenseTypeRouter.route('/')
        .post(expenseTypeController.post)
        .get(expenseTypeController.getAll);

    /**
     * Middleware to get the instance of the expense type by before passing on to the controller
     */
    expenseTypeRouter.use('/:expenseTypeId', function(req, res, next){
        ExpenseType.findById(req.params.expenseTypeId, function(err, expenseType){
            if (err){
                res.status(500).send(err);
            }
            else if (expenseType){
                req.expenseType = expenseType;
                next();
            }
            else{
                // if the expense type is not found, send a 404 (and the request will never go downstream)
                res.status(404).send('No expense type type found');
            }
        })
    });

    expenseTypeRouter.route('/:expenseTypeId')
        .get(expenseTypeController.getOne)
        //.put(expenseTypeController.put)
        //.patch(expenseTypeController.patch)
        .delete(expenseTypeController.delete);

    return expenseTypeRouter;
};

module.exports = routes;