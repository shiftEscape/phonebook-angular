'use strict';

var gulp           = require('gulp');
var jade           = require('gulp-jade');
var coffee         = require('gulp-coffee');
var livereload     = require('gulp-livereload');
var express        = require('express');
var winston        = require('winston');
var expressWinston = require('express-winston');

const CSS_DIR = './assets/css', JS_DIR = './assets/js', HTML_DIR = './views', DIST = './dist';

/* Task for converting jade files to HTML */
gulp.task('jadeFiles', function() {

  gulp.src(HTML_DIR + '/*.jade')
    .pipe(jade({
      locals: {}
    }))
    .pipe(gulp.dest( HTML_DIR ));

});

/* Task for converting coffee files to JS */
gulp.task('coffee', function() {
  gulp.src(JS_DIR + '/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest( JS_DIR ));
});

/* Task to run server at port 8000 */
gulp.task('default', ['jadeFiles', 'coffee'], function() {

  var app = express();

  app.use('/js', express.static(__dirname + '/assets/js'));
  app.use('/css', express.static(__dirname + '/assets/css'));
  app.use('/views', express.static(__dirname + '/views'));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));

  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        colorize: true
      })
    ]
  }));

  app.get("*", function(req, res) {
    res.sendfile('views/index.html', { root: __dirname });
  }).listen(8000, function() {
    console.log("*** App listening to port 8000 ***");
  });

});