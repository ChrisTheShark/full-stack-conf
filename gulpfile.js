'use strict';
const gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

let paths = {
    output_directory: 'public/dist',
    images: 'public/images',
    styles: {
        sass: 'public/scss',
        locations: ['node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/tether/dist/css/tether.min.css',
            'public/dist/css/main.css'
        ]
    },
    scripts: {
        locations: ['node_modules/jquery/dist/jquery.min.js',
            'node_modules/tether/dist/js/tether.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ]
    }
};

gulp.task('clean', function() {
    return del([paths.output_directory]);
});

gulp.task('sass', ['clean'], function() {
    return gulp.src(paths.styles.sass + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.output_directory + '/css'));
});

gulp.task('concat-styles', ['clean', 'sass'], function() {
    return gulp.src(paths.styles.locations)
        .pipe(concat('application.min.css'))
        .pipe(gulp.dest(paths.output_directory + '/css'));
});

gulp.task('concat-scripts', ['clean'], function() {
    return gulp.src(paths.scripts.locations)
        .pipe(concat('application.min.js'))
        .pipe(gulp.dest(paths.output_directory + '/js'));
});

gulp.task('copy-images', ['clean'], function() {
    return gulp.src(paths.images + '/**')
        .pipe(gulp.dest(paths.output_directory + '/img'));
});

gulp.task('default', ['concat-styles', 'concat-scripts', 'copy-images'], function() {});
