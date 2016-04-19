'use strict'

/**
 * Load dependencies
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    mainBowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    fileinclude = require('gulp-file-include'),
    usemin = require('gulp-usemin'),
    size = require('gulp-size');

/**
 * gulp default task, first hello, then default
 */
gulp.task('default', ['hello'], function() {
    console.log('this is defualt task');
});

/**
 * concat scripts
 */
gulp.task("concatScripts", function() {
    gulp.src(['bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery.sticky/jquery.sticky.js',
        'js/main.js'])
        .pipe(concat("app.js"))
        .pipe(gulp.dest('js'));
});



/**
 * uglify css- minify css
 */
gulp.task('compress', function() {
    gulp.src('js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


/**
 * Only converts from less to css
 */
gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'));
});

/**
 * Watch for less files changes
 */
gulp.task('watch', function () {
        gulp.watch('less/**/*.less',['less']);
});


/**
 * Looks up on bower.json file
 */
gulp.task('main-bower-files', function() {
    return gulp.src(mainBowerFiles())
        // Then pipe it to wanted directory, I use
        // dist/lib but it could be anything really
        .pipe(gulp.dest('dist/lib'))
});

/**
 *  Injects css & js into index.html
 */
gulp.task('injectSources', function () {
    var target = gulp.src('index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['js/*.js', 'css/*.css'], {read: false}, {relative: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('entrance'));
});


/**
 * Injects templates views into the
 */

/**
 * Usemin operations on index.html
 */

gulp.task('injectViews', function() {
    gulp.src(['example.html'])
        .pipe(size())
        .pipe(usemin({
            css: [],
            js: []
        }))
        .pipe(size())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(size())
        .pipe(gulp.dest('build/'));
});


