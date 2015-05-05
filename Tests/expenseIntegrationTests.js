var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'), // this is what supertest will use to execute out HTTP calls
    mongoose = require('mongoose'),
    Expense = mongoose.model('Expense'),
    agent = request.agent(app);


describe('Expense CRUD Test', function(){
    it('Should allow an expense to be posted and return an _id', function(done){
        // create the post body
        var expensePost = {type: 'petrol', cost: 10.23, mileage: 12345, comment: 'comment', litres: 10, date: '2015-05-12'};

        // user the agent to do the post
        agent.post('/api/expenses')
            .set('Authorization', 'testkey')
            .send(expensePost)
            .expect(200)
            .end(function(err, results){
                // here is where to put the assertions
                results.body.should.have.property('_id');
                done(); // done() lets supertest know that this test is done
            });
    });

    // clear the database again after each test
    afterEach(function(done){
        Expense.remove().exec();
        done();
    });
});