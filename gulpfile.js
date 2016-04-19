// Import required dependencies.
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    gls = require('gulp-live-server'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint');

var server = gls.static('app', '1337');
server.start();

var files = {
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'app/assets/css/',
    task: 'scss-compile'
  },
  jade: {
    src: 'src/jade/**/*.jade',
    dest: 'app/',
    task: 'jade-compile'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'app/assets/js',
    task: 'bundle-js'
  },
  libs: {
    src: [
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-facebook/angular-facebook.js'
    ],
    dest: 'app/assets/libs',
    task: 'move-libs'
  }
};

gulp.task('scss-compile', function() {
  return gulp.src(files.scss.src)
    .pipe(sass())
    .pipe(gulp.dest(files.scss.dest));
});

gulp.task('jade-compile', function() {
  return gulp.src(files.jade.src)
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(files.jade.dest));
});

gulp.task('move-libs', function() {
  return gulp.src(files.libs.src)
    .pipe(gulp.dest(files.libs.dest));
})

gulp.task('bundle-js', function() {
  return gulp.src(files.js.src)
    .pipe(jscs())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('bundle.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(files.js.dest));
});

gulp.task('watch', function() {
  // Watch each task for a file change.
  Object.keys(files).forEach(function(element, index) {
    gulp.watch([files[element].src], [files[element].task]);
  });
  // Update the live server when a file is compiled.
  gulp.watch(['app/**/*.*'], function(file) {
    server.notify.apply(server, [file]);
  })
});

gulp.task('default', ['move-libs', 'bundle-js', 'watch']);
