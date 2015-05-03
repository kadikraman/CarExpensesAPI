var express = require('express'),  // web framework
    mongoose = require('mongoose'),  // mongodb object modelling tool
    bodyParser = require('body-parser');  // allows parsing the body of incoming http requests

// connect to the database and load the models (choose DB based on the environment)
var db;
if(process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/expensesAPI_test');
}
else{
    db = mongoose.connect('mongodb://localhost/expensesAPI');
}

var Expense = require('./models/expenseModel');

// start the app
var app = express();

// gets port number from environment. Defaults to 3000.
var port = process.env.PORT || 3000;

// tell the app that we're using a body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

expenseRouter = require('./routes/expenseRoutes')(Expense);

app.use('/api/expenses', expenseRouter);

app.get('/', function(req, res){
   res.send('Welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running on port: ' + port)
});

// this export is only needed to allow supertest (integration testing) to use the app
module.exports = app;