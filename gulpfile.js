
var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var path = require('path');

gulp.task('watch', function () {
    gulp
        .src('./styles.less')
        .pipe(watch('./styles.less'))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['watch']);
