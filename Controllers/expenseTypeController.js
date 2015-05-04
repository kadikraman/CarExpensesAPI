var expenseTypeController = function(ExpenseType){
    /**
     * Saves a new expense type to the database.
     */
    var post = function(req, res){
        // create a new expense type from the request body and save it
        var expenseType = new ExpenseType(req.body);
        expenseType.save();
        // return status 201 (created) and the newly created expense type
        res.status(201);
        res.send(expenseType);
    };

    /**
     * Gets all expense types in the database.
     */
    var getAll = function(req, res){
        ExpenseType.find({}, function(error, expenseTypes){
            if(error){
                res.status(500);
                res.send(err);
            }
            else{
                res.json(expenseTypes);
            }
        });
    };

    /**
     * Gets one expense type object form the database
     */
    var getOne = function(req, res){
        res.json(req.expenseType);
    };

    /**
     * Deletes the selected expense type
     */
    var delete_item = function(req, res){
        req.expenseType.remove(function(err){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(204).send('Removed');
            }
        });
    };

    return {
        post: post,
        getAll: getAll,
        getOne: getOne,
        delete: delete_item
    }
};

module.exports = expenseTypeController;