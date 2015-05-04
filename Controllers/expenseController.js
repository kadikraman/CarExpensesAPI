/**
 * Controller to handle requests under /api/expenses/<expense_id>
 * @param Expense
 * @returns {{get: Function, put: Function, patch: Function, delete: Function}}
 */

var expenseController = function(){
    var get = function(req, res){
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
        };
    };

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
        get: get,
        put: put,
        patch: patch,
        delete: delete_item
    }
};

module.exports = expenseController;
