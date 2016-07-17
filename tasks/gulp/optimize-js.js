'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('./gulp-config');

gulp.task('optimize:js', function(){
    return gulp.src('.tmp/public/js/main.js')
        .pipe(plugins.uglifyjs({
            mangle: false
        }))
        .pipe(gulp.dest('.tmp/public/js/'));
});