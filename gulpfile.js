/*
 * race
 *
 * Copyright(c) 2014 André König <andre.koenig@konexmedia.com>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@konexmedia.com>
 *
 */

'use strict';

var gulp = require('gulp');
var webmake = require('gulp-webmake');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
var jasmine = require('gulp-jasmine');

var pkg = require('./package.json');

var paths = {};

var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version <%= pkg.version %>',
    ' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)',
    ' * @license <%= pkg.license %>',
    ' *',
    ' */', ''].join('\n');

paths.sources = ['./index.js', './index.spec.js'];
paths.lintables = ['./*.js'];
paths.component = './dist';

gulp.task('lint', function () {
    return gulp.src(paths.lintables)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
    return gulp.src(paths.sources)
        .pipe(jasmine());
});

gulp.task('webmake:build', function () {
    return gulp.src('./index.js')
        .pipe(webmake())
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(header(banner, {pkg : pkg}))
        .pipe(gulp.dest(paths.component));
});

gulp.task('build', ['lint', 'test', 'webmake:build']);

gulp.task('default', ['build']);