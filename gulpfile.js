var gulp = require('gulp'),
    autoprefixer = require("gulp-autoprefixer"),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require("gulp-less"),
    tailwindcss = require("tailwindcss");

gulp.task('compile-less', function(){
    gulp
        .src('./src/less/*.less')
        .pipe(less()) 
        .pipe(gulp.dest('./src/css/'));
        
  });

gulp.task('styles', function(){
    gulp
        .src("src/css/style.css")
        .pipe(postcss([
            require('tailwindcss'),
            require('autoprefixer')
        ]))
        .pipe(gulp.dest('./public/css/'))
});



gulp.task('watch', function(){
    gulp.watch('./src/css/style.css', ['styles']);
    gulp.watch('./src/less/**/*.less', ['compile-less']);
    gulp.watch('./src/js/**/**.vue');
    gulp.watch('./src/js/**.js');
    gulp.watch('tailwind.js');
    gulp.watch('./views/**/**/**.ejs', ['styles']);

});


/* Run 'gulp' task in ternimal to watch for associated tasks above.*/
gulp.task('default', ['compile-less', 'styles', 'watch']);
