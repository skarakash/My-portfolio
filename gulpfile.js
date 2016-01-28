var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    concatCSS = require('gulp-concat-css');

gulp.task('server', function () {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('gulp-concat-css', function () {
    return gulp.src('app/css/**/*.css')
        .pipe(concatCSS('style.css'))
        .pipe(gulp.dest('app/css'));
});


gulp.task('watch', function () {
    gulp.watch([
        'app/*.html',
        'app/js/**/*.js',
        'app/css/**/*.css'
        ]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'watch']);