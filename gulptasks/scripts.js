'use strict';
/*jshint -W024 */

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var es          = require('event-stream');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var config      = require('../config');

// base object from config.js
var base     = config.base;
var filepath = config.filepath;

var files = [
    {
        name: 'vendor-libs',
        path: filepath.vendorLibs
    },
    {
        name: 'app-libs',
        path: filepath.appLibs
    },
    {
        name: 'app-scripts',
        path: filepath.appScripts
    }
];

function concateScripts(watch, entry) {
    return gulp
        .src( entry.path )
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat(entry.name +'.js'))

        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(base.js));

        // .pipe( plugins.if( watch, reload({stream: true}) ) )
        // .pipe( plugins.size( {title: 'JS bundled'} ) );
}

module.exports = function (watch) {

    var tasks = files.forEach(function(entry){
        concateScripts(watch, entry);
    });

    // create a merged stream
    return es.merge.apply(null, tasks);
};
