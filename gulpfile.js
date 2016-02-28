
var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var importCss = require('gulp-import-css');
var stripCssComments = require('gulp-strip-css-comments');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var path = require('path');

gulp.task('less', function() {
    gulp
        .src('./styles/*.less')
        .pipe(concat('./styles.css'))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        //.pipe(importCss())
        .pipe(stripCssComments())
        .pipe(minifyCss())
        .pipe(gulp.dest('./styles/'));
});

gulp.task('js', function() {
  return gulp.src('./*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('index.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    watch('./less/*.less', function() {
       gulp.start('less');
   });
});

gulp.task('default', ['less', 'js', 'html']);
