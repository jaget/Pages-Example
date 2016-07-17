'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence')
    ;

gulp.task('optimize', function(callback){
    runSequence(
        'optimize:sass',
        'optimize:js',
        'optimize:jsModal',
        callback
    );
});