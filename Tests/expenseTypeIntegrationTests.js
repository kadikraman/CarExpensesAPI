var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'), // this is what supertest will use to execute out HTTP calls
    mongoose = require('mongoose'),
    ExpenseType = mongoose.model('ExpenseType'),
    agent = request.agent(app);


describe('Expense type CRUD Test', function(){
    it('Should allow an expense type to be posted and return an _id', function(done){
        // create the post body
        var expenseTypePost = {name: 'petrol', description: 'Tasty petrol expense'};

        // user the agent to do the post
        agent.post('/api/expense_types')
            .set('Authorization', 'testkey')
            .send(expenseTypePost)
            .expect(200)
            .end(function(err, results){
                // here is where to put the assertions
                results.body.should.have.property('_id');
                done(); // done() lets supertest know that this test is done
            });
    });

    // clear the database again after each test
    afterEach(function(done){
        ExpenseType.remove().exec();
        done();
    });
});