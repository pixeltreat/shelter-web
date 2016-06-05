'use strict';
/* jshint node: true */

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var es          = require('event-stream');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var config      = require('../config');

// base object from config.js
var base     = config.base;
var filepath = config.filepath;

var scripts = {};

scripts.vendorLibs = function (watch){
    return gulp
    .src( filepath.vendorLibs )
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('vendor-libs.js'))

    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(base.js))

    .pipe( plugins.if( watch, reload({stream: true}) ) )
    .pipe( plugins.size( {title: 'JS bundled'} ) );
};

scripts.appLibs = function (watch){
    return gulp
    .src( filepath.appLibs )
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('app-libs.js'))

    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(base.js))

    .pipe( plugins.if( watch, reload({stream: true}) ) )
    .pipe( plugins.size( {title: 'JS bundled'} ) );
};

scripts.appScripts = function (watch){
    return gulp
    .src( filepath.appScripts )
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('app-scripts.js'))

    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(base.js))

    .pipe( plugins.if( watch, reload({stream: true}) ) )
    .pipe( plugins.size( {title: 'JS bundled'} ) );
};

// export scripts object
module.exports = scripts;
