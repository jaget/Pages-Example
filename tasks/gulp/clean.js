'use strict';

var gulp = require('gulp'),
    del = require('del'),
    plugins = require('gulp-load-plugins')(),
    config = require('./gulp-config');

gulp.task('clean', function(callback) {
    del([
        '.tmp/public/*'
    ], callback);
    callback();
});