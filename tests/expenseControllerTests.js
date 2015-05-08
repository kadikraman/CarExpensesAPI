var should = require('should'),  // assertion framework
    sinon = require('sinon');  // mocking framework

describe('Expense controller tests: ', function() {
    describe('Put', function () {
        it('should not allow an empty type on an expense', function () {

            // mock out the request
            // req.expense is the instance of the expense mocked out to come from the db
            // req.body is the user input for the updated values of the expense
            var req = {
                expense: {
                    mileage: 123456,
                    cost: 12.34,
                    date: '2015-05-12',
                    type: 'petrol',
                    save: function(err){}
                },
                body: {
                    mileage: 123456,
                    cost: 12.34,
                    date: '2015-05-12'
                }
            };

            // mock out the response
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            // execute the test
            var expenseController = require('../controllers/expenseController')();
            expenseController.put(req, res);

            // assertions
            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('Expense type is required (use Patch to edit a singe field).').should.equal(true);
        });
        it('should not allow an empty cost on an expense', function () {

            // mock out the request
            // req.expense is the instance of the expense mocked out to come from the db
            // req.body is the user input for the updated values of the expense
            var req = {
                expense: {
                    mileage: 123456,
                    cost: 12.34,
                    date: '2015-05-12',
                    type: 'petrol',
                    save: function(err){}
                },
                body: {
                    mileage: 123456,
                    date: '2015-05-12',
                    type: 'petrol'
                }
            };

            // mock out the response
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            // execute the test
            var expenseController = require('../controllers/expenseController')();
            expenseController.put(req, res);

            // assertions
            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('Expense cost is required (use Patch to edit a singe field).').should.equal(true);
        });
        it('should not allow an empty date on an expense', function () {

            // mock out the request
            // req.expense is the instance of the expense mocked out to come from the db
            // req.body is the user input for the updated values of the expense
            var req = {
                expense: {
                    mileage: 123456,
                    cost: 12.34,
                    date: '2015-05-12',
                    type: 'petrol',
                    save: function(err){}
                },
                body: {
                    mileage: 123456,
                    type: 'petrol',
                    cost: 12.34
                }
            };

            // mock out the response
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            // execute the test
            var expenseController = require('../controllers/expenseController')();
            expenseController.put(req, res);

            // assertions
            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('Expense date is required (use Patch to edit a singe field).').should.equal(true);
        });
    });

    describe('Post', function(){
        it('should not allow an empty cost on an expense', function(){
            // mock out out expense object and implement the save() method which will be called in the controller
            // which won't do anything (we don't need it to for this test)
            var Expense = function(expense){this.save = function(){}};

            // mock out the request
            var req = {
                body: {
                    type: "petrol",
                    mileage: 123456,
                    date: "2015-05-12"
                }
            };

            // mock out the response
            // sinon.spy() keeps track of how many times these methods were called an by whom
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            // execute the test
            var expensesController = require('../controllers/expenseController')(Expense);
            expensesController.post(req, res);

            // assertions
            res.status.calledWith(400).should.equal(true, 'Bad Status: ' + res.status.args[0][0]);
            res.send.calledWith('Expense cost is required.').should.equal(true);
        });
        it('should not allow an empty date on an expense', function(){
            // mock out out expense object and implement the save() method which will be called in the controller
            // which won't do anything (we don't need it to for this test)
            var Expense = function(expense){this.save = function(){}};

            // mock out the request
            var req = {
                body: {
                    type: "petrol",
                    cost: 10.45,
                    mileage: 123456
                }
            };

            // mock out the response
            // sinon.spy() keeps track of how many times these methods were called an by whom
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            // execute the test
            var expensesController = require('../controllers/expenseController')(Expense);
            expensesController.post(req, res);

            // assertions
            res.status.calledWith(400).should.equal(true, 'Bad Status: ' + res.status.args[0][0]);
            res.send.calledWith('Expense date is required.').should.equal(true);
        })
    });
});
