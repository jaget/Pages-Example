// require modules
var gulp = require('gulp'),
    imageminPngquant = require('imagemin-pngquant'),
    runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();

// require config
var config = require('./gulp-config');

gulp.task('images', function(callback) {
    runSequence(
        'images:default',
        'images:png',
        callback
    );
});
gulp.task('images:default', function() {
    return gulp.src('assets-source/images/**/*.+(jpg|jpeg|gif|svg)')
        .pipe(plugins.cache(plugins.imagemin(), {
            name: 'project'
        }))
        .pipe(gulp.dest('.tmp/public/images'));
});
gulp.task('images:png', function(){
    return gulp.src('assets-source/images/**/*.png')
        .pipe(imageminPngquant({quality: '65-80', speed: 4})())
        .pipe(gulp.dest('.tmp/public/images'));
});
