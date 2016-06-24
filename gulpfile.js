/**
 * Created by zenaro on 16-6-24.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    CSSmin = require('gulp-minify-css');

gulp.task('default', function () {
    gulp.src('public/home/less/*.less')
        .pipe(less())
        .pipe(CSSmin())
        .pipe(gulp.dest('public/home/css'));
});

gulp.task('watch', function () {
    gulp.watch('public/home/less/*.less', ['default']);
});