'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('./gulp-config'),
    strip = require('gulp-strip-comments'),
    pipeline = require('../pipeline');

gulp.task('concat:js', function(){
    return gulp.src(pipeline.jsFilesToInject)
        .pipe(plugins.sourcemaps.init())
        //.pipe(strip())
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.sourcemaps.write(config.mapsDest))
        .pipe(gulp.dest('.tmp/public/js/'));
});