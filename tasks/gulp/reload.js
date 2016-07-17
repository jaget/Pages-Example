'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync')
    ;


// Browser Sync
gulp.task('reload', function() {
    browserSync.reload({
        stream: true
    });
});