// require modules
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// require config
var config = require('./gulp-config');

gulp.task('templates', function() {
    return gulp.src('assets-source/templates/**/*.html')
        .pipe(plugins.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('.tmp/public/templates/'))
});
