var gulp = require('gulp');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

gulp.task('move-js', function() {
    return gulp.src('./app/**/*.js')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./static/js'));
});

gulp.task('move-css', function() {
    return gulp.src('./app/**/*.css')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('move-font', function() {
    return gulp.src('./app/theme/font/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./static/font'));
});

gulp.task('move-img', function() {
    return gulp.src('./app/theme/img/**/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./static/img'));
});



gulp.task('inject-src', ['move-js', 'move-css'], function() {
    var target = gulp.src('./app/**/*.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./static/js/*.js', './static/css/*.css'], {read: false});

    return target.pipe(inject(sources, {relative: false}))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./static/html'));
});

gulp.task('watch', function () {
    watch('./app/**/*.js', batch(function (events, done) {
        gulp.start('inject-src', done);
    }));
    watch('./app/**/*.css', batch(function (events, done) {
        gulp.start('inject-src', done);
    }));
    watch('./app/**/*.html', batch(function (events, done) {
        gulp.start('inject-src', done);
    }));
});

gulp.task('build', ['inject-src', 'move-font', 'move-img']);