var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');


gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});

// not actually used for prod at the moment. just a way to peek into the prod database for now
gulp.task('prod', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 7000,
            environment: 'Production'
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function(){
            console.log('Restarting');
        });
});

gulp.task('test', function(){
    env({vars: {ENV: 'Test'}});
    gulp.src('./tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
        .once('end', function () {
            process.exit(0);
        });
});
