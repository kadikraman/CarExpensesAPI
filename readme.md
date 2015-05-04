- install node
- install mongoDB

In project directory:
- run: node install (installs dependencies)
- run: sudo npm install gulp (to access gulp from the command line)
- run: gulp (to start the server)


To run the tests:
- run: gulp test


For production database:

create a file config.js in the root directory of the project which contains:

module.exports = {
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

run: gulp prod
