var express = require('express'),  // web framework
    mongoose = require('mongoose'),  // mongodb object modelling tool
    bodyParser = require('body-parser');  // allows parsing the body of incoming http requests


var db = mongoose.connect('mongodb://localhost/expensesAPI');

var Expense = require('./models/expenseModel');
var app = express();

// gets port number from environment. Defaults to 3000.
var port = process.env.PORT || 3000;

// tell the app that we're using a body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var expensesRouter = express.Router();

expensesRouter.route('/Expenses')
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

expensesRouter.route('/Expenses/:expenseId')
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


app.use('/api', expensesRouter);


app.get('/', function(req, res){
   res.send('Welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running on port: ' + port)
});