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
 var del            = require('del');

 var watch          = false;
 var publish        = false;

 var base     = config.base;
 var filepath = config.filepath;

 // gulp build taks import
 var copyFiles      = require('./gulptasks/copyfiles');
 var stylesCompile  = require('./gulptasks/styles');
 var scriptsCompile = require('./gulptasks/scripts');

 // Clean Output Directory
 gulp.task('clean', del.bind(null, ['.tmp', base.dist]));

 // copy files to build folder
 gulp.task('copyFiles', function(){
     return copyFiles(watch);
 });

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
    gulp.watch('application/src/**/*', ['requireMain']);
});

// build task
gulp.task('build', ['clean'], function(cb) {
    runSequence(['copyFiles'], ['styles'], ['vendorLibs', 'appLibs', 'appScripts', 'requireMain'], cb);
});

// Default task runs dev build, watches for file changes and browser reloads
gulp.task('default', ['build'], function(cb) {
    runSequence(['browser-sync', 'watch'], cb);
});

// publish task
gulp.task('publish', function(cb) {
    publish = true;
    runSequence('build', cb);
});
