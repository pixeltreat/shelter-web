'use strict';
/* jshint node: true */
var browserSync = require('browser-sync');
var config      = require('../config');

// base build folder path from config.js
var buildFolder = config.base.root;

module.exports = function() {
	browserSync({
		files: ['application/**/*.html', 'application/src/**/*.js'],
		notify: false,
		server: { baseDir: buildFolder }
   });
};
