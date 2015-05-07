# Car expenses API
API for storing and fetching car expenses data. Built with node, express and mongoDB.

### Usage (public)
- **GET** <host>/api/expense_types ---- *returns all expense types registred with the system *
- **GET** <host>/api/expense_types/<id> ----- *returns the specified expense type*
- **GET** <host>/api/expenses ---- *returns all expenses matching the search params*
- **GET** <host>/api/expenses/<id> ---- *returns the specified expense*

### Usage (Auth required)
- **POST** <host>/api/expense_types ---- *adds a new expense type, name must be unique*
- **DELETE** <host>/api/expense_types/<id> ---- *deletes the expense type specified*
- **POST** <host>/api/expenses ---- *adds a new expense*
- **PATCH** <host>/api/expenses/<id> ---- *replaces the selected expense with the new values*
- **PUT** <host>/api/expenses/<id> ---- *updates the selected expense partially (only the values included in the request body)*
- **DELETE** <host>/api/expenses/<id> ---- *deletes the specified expense*

### Dev instructions
- install node
- install mongoDB

In project directory:
- Create a file config.js (copying this exactly is enough to run the application locally and to run the tests)
```
module.exports = {
    dev: {
        key: 'devkey',
        db: {
            name: 'car_expenses_dev',
            host: 'localhost',
            username: '',
            password: ''
        }
    },
    test: {
        key: 'testkey',
        db: {
            name: 'car_expenses_test',
            host: 'localhost',
            username: '',
            password: ''
        }
    },
    prod: {
        sessionSecret: '<<sessionsecret>>',
        db: {
            name: '<<dbname>>',
            host: '<<dbhostname>>',
            username: '<<dbusername>>',
            password: '<<dbpassword>>'
        }
    }
};
```
- run: node install (installs dependencies)
- run: sudo npm install gulp (to access gulp from the command line)
- run: gulp (to start the server)

**dev note:** when doing requests, must put Content-Type application/json in the header