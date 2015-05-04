var should = require('should'),  // assertion framework
    sinon = require('sinon');  // mocking framework

describe('Expense Type controller tests: ', function() {
    describe('Post', function () {
        it('should not allow creating an expense type with no name', function(){
            // mock out out expense type object
            var ExpenseType = function(expenseType){this.save = function(){}};

            // mock out the request
            var req = {
                body: {
                    description: "some description"
                }
            };

            // mock out the response
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            // execute the test
            var expenseTypeController = require('../controllers/expenseTypeController')(ExpenseType);
            expenseTypeController.post(req, res);

            // assertions
            res.status.calledWith(400).should.equal(true, 'Bad Status: ' + res.status.args[0][0]);
            res.send.calledWith('ExpenseType name is required.').should.equal(true);
        });

        it('should not allow creating an expense type with no description', function(){
            // mock out out expense type object
            var ExpenseType = function(expenseType){this.save = function(){}};

            // mock out the request
            var req = {
                body: {
                    name: "petrol"
                }
            };

            // mock out the response
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            // execute the test
            var expenseTypeController = require('../controllers/expenseTypeController')(ExpenseType);
            expenseTypeController.post(req, res);

            // assertions
            res.status.calledWith(400).should.equal(true, 'Bad Status: ' + res.status.args[0][0]);
            res.send.calledWith('ExpenseType description is required.').should.equal(true);
        });
    });
});
