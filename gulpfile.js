const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('default', function(){

});

gulp.task('scss', function(){
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream:true
        }))
});

gulp.task('watch', function(){
    gulp.watch('./scss/*.scss', ['scss'])
});

gulp.task('watch', ['browser-sync', 'scss'], function(){
    gulp.watch('./scss/**/*.scss', ['scss'])
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});



