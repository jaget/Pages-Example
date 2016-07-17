// require modules
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync');

// require custom modules
var customPlumber = require('./custom-modules/plumber');

// require config
var config = require('./gulp-config');

gulp.task('sass', function() {
    return gulp.src(config.sassSrc)
        .pipe(plugins.sassGlob())
        .pipe(customPlumber('Error Running Sass'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            includePaths: [
                'assets/bower_components',
                'node_modules'
            ]
        }))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sourcemaps.write(config.mapsDest))
        .pipe(gulp.dest('.tmp/public/css/'))
        ;// todo read this https://github.com/BrowserSync/browser-sync/issues/717
});