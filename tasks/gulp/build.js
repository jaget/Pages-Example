'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence')
    ;

gulp.task('build:prod', function(callback) {
    runSequence(
        'clean',
        'sync',
        ['fonts', 'images', 'templates', 'sass', 'concat:js', 'concat:jsModal'],
        'optimize',
        callback
    );
});