'use strict';
/* jshint node: true */

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var es          = require('event-stream');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var config      = require('../config');

// base object from config.js
var base       = config.base;
var filepath   = config.filepath;
var rjsOptions = config.requirejsOptimizeOptions;

var scripts = {};

scripts.vendorLibs = function (watch){
    return gulp
    .src( filepath.vendorLibs )
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('vendor-libs.js'))

    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(base.js))

    .pipe( plugins.if( watch, reload({stream: true}) ) )
    .pipe( plugins.size( {title: 'vendor libs bundled'} ) );
};

scripts.appLibs = function (watch){
    return gulp
    .src( filepath.appLibs )
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('app-libs.js'))

    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(base.js))

    .pipe( plugins.if( watch, reload({stream: true}) ) )
    .pipe( plugins.size( {title: 'app libs bundled'} ) );
};

scripts.appScripts = function (watch){
    return gulp
    .src( filepath.appScripts )
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('app-scripts.js'))

    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(base.js))

    .pipe( plugins.if( watch, reload({stream: true}) ) )
    .pipe( plugins.size( {title: 'app scripts bundled'} ) );
};

scripts.requireMain = function (watch){
    return gulp
    .src(filepath.requireMain)
	.pipe(plugins.sourcemaps.init())
	.pipe(plugins.requirejsOptimize(rjsOptions))
	.pipe(plugins.sourcemaps.write('.'))
	.pipe(gulp.dest(base.js))

    .pipe( plugins.if( watch, reload({stream: true}) ) )
    .pipe( plugins.size( {title: 'require main bundled'} ) );
};

// export scripts object
module.exports = scripts;
