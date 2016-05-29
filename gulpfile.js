/*
 *  Project builds
 *  Author: Durga Prasad Sadhanala
 */

 'use strict';
 /*jshint -W024 */

 // Include gulp
 var gulp          = require('gulp');

 // Include Plugins
 /* all the plugins starts with 'gulp' will loaded using load-plugins */
 var runSequence    = require('run-sequence');
 var config         = require('./config');
 var watch          = false;
 var publish        = false;

 var base     = config.base;
 var filepath = config.filepath;

 // gulp build taks import
 var stylesCompile  = require('./gulptasks/styles');
 var scriptsCompile = require('./gulptasks/scripts');

 // compile styles
 gulp.task('styles', function() {
   return stylesCompile(watch, publish);
 });

 // compile scripts
 gulp.task('scripts', function(){
     return scriptsCompile(watch, publish);
 });

// browser-sync task for starting the server.
gulp.task('browser-sync', require('./gulptasks/browser-reload'));

// watch task
gulp.task('watch', function() {
    watch = true;
    gulp.watch(filepath.styles.allScss, ['styles']);
    gulp.watch([filepath.vendorLibs, filepath.appScripts], ['scripts']);
});

// Default task runs dev build, watches for file changes and browser reloads
gulp.task('default', function(cb) {
    runSequence('styles', 'browser-sync', 'watch', 'scripts', cb);
});
