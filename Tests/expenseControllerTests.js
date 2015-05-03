var should = require('should'),  // assertion framework
    sinon = require('sinon');  // mocking framework
// note: we don't need a reference to mocha, because it runs inside the mocha framework (gulp-mocha for us)

describe('Expense controller Tests: ', function(){
    describe('Post', function(){
        it('should not allow an empty type on an expense', function(){
            // mock out out expense object and implement the save() method which will be called in the controller
            // which won't do anything (we don't need it to for this test)
            var Expense = function(expense){this.save = function(){}};

            // mock out the request
            var req = {
                body: {
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
            var expenseController = require('../Controllers/expenseController')(Expense);
            expenseController.post(req, res);

            // assertions
            res.status.calledWith(400).should.equal(true, 'Bad Status: ' + res.status.args[0][0]);
            res.send.calledWith('Expense type is required.').should.equal(true);
        })
    })
});