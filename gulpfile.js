
var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var importCss = require('gulp-import-css');
var stripCssComments = require('gulp-strip-css-comments');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
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

gulp.task('watch', function () {
    watch('./less/*.less', function() {
       gulp.start('less');
   });
});

gulp.task('default', ['less', 'watch']);
