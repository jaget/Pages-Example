// required modules
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

// Custom Plumber function for catching errors
function customPlumber(errTitle) {
    return plumber({
        errorHandler: notify.onError({
            // Customizing error title
            title: errTitle || 'Error running Gulp',
            message: 'Error: <%= error.message %>',
        })
    });
}

module.exports = customPlumber;