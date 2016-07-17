'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),

    config = require('./gulp-config')
    ;


// Browser Sync
gulp.task('browserSync', function() {
    browserSync.init({
        proxy: config.proxyUrl,
        files: config.browserRoot,
        port: 3000
        //socket: {
        //    path: '/socket.io'
        //}
    });
});