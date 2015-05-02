var express = require('express');


var app = express();

// gets port number from environment. Defaults to 3000.
var port = process.env.PORT || 3000;

var expensesRouter = express.Router();

expensesRouter.route('/Expenses')
    .get(function(req, res){
        var responseJson = {hello: "This is my api"};

        res.json(responseJson);
    });


app.use('/api', expensesRouter);


app.get('/', function(req, res){
   res.send('Welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running on port: ' + port)
});