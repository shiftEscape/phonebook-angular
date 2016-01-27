'use strict';

var gulp           = require('gulp');
var jade           = require('gulp-jade');
var coffee         = require('gulp-coffee');
var concat         = require('gulp-concat');
var replace        = require('gulp-replace');
var gulpif         = require('gulp-if');
var gulpifElse     = require('gulp-if-else');
var livereload     = require('gulp-livereload');
var uglify         = require('gulp-uglify');
var express        = require('express');
var winston        = require('winston');
var expressWinston = require('express-winston');
var argv           = require('yargs').argv;

const
  PORT                = 8000,
  CSS_DIR             = './assets/css',
  JS_SRC_DIR          = './assets/js',
  JS_DEST_DIR         = './dist/js',
  HTML_DIR            = './views',
  JS_ALL_FILENAME     = 'scripts.js',
  JS_ALL_MIN_FILENAME = 'scripts.min.js';

var isProd = argv.env === 'production';

/* Task for converting coffee files to JS */
gulp.task('build-coffee', function() {
  gulp.src(JS_SRC_DIR + '/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulpif(isProd, uglify()))
    .pipe(concat(gulpif(isProd, JS_ALL_MIN_FILENAME, JS_ALL_FILENAME)))
    .pipe(gulp.dest( JS_DEST_DIR ))
    .pipe(livereload());
});

/* Task for converting jade files to HTML */
gulp.task('build-jade', function() {
  gulp.src(HTML_DIR + '/*.jade')
    .pipe(jade())
    .pipe(replace('js/phoneBookController.js', '/dist/js/' + gulpif(isProd, JS_ALL_MIN_FILENAME, JS_ALL_FILENAME)))
    .pipe(gulp.dest( HTML_DIR ))
    .pipe(livereload());
});

/* Task to run server at port 8000 */
gulp.task('default', ['build-coffee', 'build-jade'], function() {

  var app = express();
  app.use('/js', express.static(__dirname + '/assets/js'));
  app.use('/css', express.static(__dirname + '/assets/css'));
  app.use('/dist', express.static(__dirname + '/dist'));
  app.use('/views', express.static(__dirname + '/views'));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));

  /* Log http requests to console */
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({ colorize: true })
    ]
  }));

  /* Fetch all routes and render index.html file */
  app.get("*", function(req, res) {
    res.sendfile('views/index.html', { root: __dirname });
  }).listen(PORT, function() {
    console.log("*** App listening to port "+PORT+" ***");
  });

  livereload({ start: true });
  gulp.watch('./assets/js/*.coffee', ['build-coffee']);
  gulp.watch('./views/*.jade', ['build-jade']);

});
