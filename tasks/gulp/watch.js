var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    pipeline = require('../pipeline');
// require config
var config = require('./gulp-config');

// Watchers files for changes
gulp.task('watch', function() {
    gulp.watch(config.sassDir, ['sass', 'lint:sass']);
    gulp.watch(['assets-source/**/*', 'tasks/pipeline.js'], ['watch-js']);
    gulp.watch(config.templatesDir, ['templates']);
    gulp.watch(['.tmp/public', 'views/**'], ['reload']);
});

gulp.task('watch-js', function(callback) {
    runSequence(
        'concat:js',
        'concat:jsModal',
        //'lint:js',
        callback
    )
});