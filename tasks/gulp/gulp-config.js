module.exports = {
    proxyUrl: 'localhost:1337',
    browserRoot: '**/*',
    buildDir: 'assets',
    syncDirSrc: {
        all: [
            'assets/**/*'
        ],
        js: [
            'assets-source/bower/tinymce-dist/**/*',
            '!axssets-source/bower/tinymce-dist/*'
        ]
    },
    mapsDest: './',
    sassDir: 'assets-source/styles/sass/**/*',
    sassSrc: 'assets-source/styles/sass/styles.scss',
    sassDest: 'assets/css',
    jsSrc: '**/*.js',
    jsDest: 'assets/js',
    templatesDir: 'assets-source/templates/**/*.html',
    sprites: {
        src: 'assets-source/styles/sass/partials',
        imageSrc: 'assets/images/sprites',
        retinaImageName: 'sprites@2x.png',
        cssName: '_sprites.scss',
        imgName: 'sprites.png',
        retinaSrcFilter: 'assets/images/sprites/*@2x.png',
        spriteSrc: 'assets/build/images/sprites/**/*'
    }
};