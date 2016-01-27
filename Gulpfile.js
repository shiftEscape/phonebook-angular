'use strict';

var gulp           = require('gulp');
var jade           = require('gulp-jade');
var coffee         = require('gulp-coffee');
var stylus         = require('gulp-stylus');
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
  PORT                 = 8000,
  CSS_SRC_DIR          = './assets/css',
  CSS_DEST_DIR         = './dist/css',
  CSS_ALL_FILENAME     = 'styles.css',
  CSS_ALL_MIN_FILENAME = 'styles.min.css',
  JS_SRC_DIR           = './assets/js',
  JS_DEST_DIR          = './dist/js',
  JS_ALL_FILENAME      = 'scripts.js',
  JS_ALL_MIN_FILENAME  = 'scripts.min.js',
  HTML_DIR             = './views';

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

/* Task for converting stylus files to CSS */
gulp.task('build-stylus', function() {
  gulp.src(CSS_SRC_DIR + '/*.styl')
    .pipe(stylus(gulpif(isProd, {compress: true}, {compress: false})))
    .pipe(concat(gulpif(isProd, CSS_ALL_MIN_FILENAME, CSS_ALL_FILENAME)))
    .pipe(gulp.dest( CSS_DEST_DIR ))
    .pipe(livereload());
});

/* Task for converting jade files to HTML */
gulp.task('build-jade', function() {
  gulp.src(HTML_DIR + '/*.jade')
    .pipe(jade())
    .pipe(replace('!{JS_FILE_HERE}', '/dist/js/' + gulpif(isProd, JS_ALL_MIN_FILENAME, JS_ALL_FILENAME)))
    .pipe(replace('!{CSS_FILE_HERE}', '/dist/css/' + gulpif(isProd, CSS_ALL_MIN_FILENAME, CSS_ALL_FILENAME)))
    .pipe(gulp.dest( HTML_DIR ))
    .pipe(livereload());
});

/* Task to run server at port 8000 */
gulp.task('default', ['build-coffee', 'build-stylus', 'build-jade'], function() {

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
