var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    concat = require('gulp-concat');

gulp.task('server', function () {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('concat', function () {
    return gulp.src('app/pre-css/**/*.css')
        .pipe(concat('style.css', {
            newLine: '\n'
        }))
        .pipe(gulp.dest('app/css'))
});


gulp.task('watch', function () {
    gulp.watch([
        'app/*.html',
        'app/js/**/*.js',
        'app/**/*.css'
        ]).on('change', browserSync.reload);
    gulp.watch('app/pre-css/**/*.css', ['concat']);
});

gulp.task('default', ['server', 'watch']);