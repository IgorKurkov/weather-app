var gulp           = require('gulp'),
    browserSync    = require('browser-sync'),
    notify         = require('gulp-notify'),
    sass           = require('gulp-sass');


gulp.task("start-server", () => {
  browserSync({
    server: {baseDir: "app"},
    notify: true});
});

gulp.task("reload", () => {
  browserSync.reload({stream: true});
})

gulp.task('sass', () => {
  return gulp.src('app/sass/**/*+(.sass|.scss)')
      .pipe(sass().on("error", notify.onError()))
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task("default", ["sass", "start-server"], () => {
  gulp.watch('app/sass/**/*.sass', ["sass", "reload"]);
  gulp.watch('app/js/**/*.js', ["reload"]);
  gulp.watch('app/**/*.html', ["reload"]);
})