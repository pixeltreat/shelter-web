/*
 *  Project builds
 *  Author: Durga Prasad Sadhanala
 */

 'use strict';
 /* jshint node: true */

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
 gulp.task('vendorLibs', function(){
    return scriptsCompile.vendorLibs(watch, publish);
 });

 gulp.task('appLibs', function(){
    return scriptsCompile.appLibs(watch, publish);
 });

 gulp.task('appScripts', function(){
    return scriptsCompile.appScripts(watch, publish);
 });

 gulp.task('requireMain', function(){
    return scriptsCompile.requireMain(watch, publish);
 });

// browser-sync task for starting the server.
gulp.task('browser-sync', require('./gulptasks/browser-reload'));

// watch task
gulp.task('watch', function() {
    watch = true;
    gulp.watch(filepath.styles.allScss, ['styles']);
    gulp.watch(filepath.vendorLibs, ['vendorLibs']);
    gulp.watch(filepath.appLibs, ['appLibs']);
    gulp.watch(filepath.appScripts, ['appScripts']);
});

// Default task runs dev build, watches for file changes and browser reloads
gulp.task('default', function(cb) {
    runSequence('styles', 'browser-sync', 'watch', 'vendorLibs', 'appLibs', 'appScripts', 'requireMain', cb);
});
