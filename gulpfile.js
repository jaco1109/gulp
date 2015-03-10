var gulp = require('gulp');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var styledocco = require('gulp-styledocco');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./css'));
});

gulp.task('styledocco', function() {
  gulp.src('./sass/**/*.scss')
    .pipe(styledocco({
      out: 'docs',
      name: 'test project',
      'no-minify': false
    }));
});