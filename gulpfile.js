var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    notify      = require('gulp-notify'),
    sass        = require('gulp-sass'),
    less        = require('gulp-less'),
    path        = require('path'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
///////////////////////////////
    fs          = require('fs'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    babelify    = require('babelify'),
    rimraf      = require('rimraf'),
    source      = require('vinyl-source-stream'),
    _           = require('lodash'),
    reload      = browserSync.reload,
    change      = require('gulp-change');

    
    
    




gulp.task("start-server", () => {
  browserSync({
    server: {baseDir: "app"},
    notify: true});
});

gulp.task("reload", () => {
  browserSync.reload({stream: true});
})

gulp.task('less', () => {
  // return gulp.src('app/less/**/*.less')
  return gulp.src('app/less/styles.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }).on("error", notify.onError()))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task("default", ["less", "start-server"], () => {
  gulp.watch('app/css/**/*.css', ["reload"]);
  gulp.watch('app/less/**/*.less', ["less", "reload"]);
  gulp.watch('app/js/**/*.js', ["reload"]);
  gulp.watch('app/**/*.html', ["reload"]);
})


// gulp.task('sass', () => {
//   return gulp.src('app/sass/**/*+(.sass|.scss)')
//       .pipe(sass().on("error", notify.onError()))
//       .pipe(gulp.dest('app/css'))
//       .pipe(browserSync.reload({stream: true}));
// });

// gulp.task("build-html", () => {
//   return gulp.src('app/index.html')

//   .pipe(gulp.dest('./dist/'))
// });

gulp.task('build-html', function() {
  return gulp.src('app/index.html')
      .pipe(change((content) => {
        return content.replace(/type\=\"module\"/g, '');
        }))
      .pipe(gulp.dest('dist/'))
});



////////=== transpile JS modules to single js file  ===//////////
//https://github.com/thoughtram/es6-babel-browserify-boilerplate
var config = {
  entryFile: './app/js/app.js',
  outputDir: './dist/js',
  outputFile: 'app.js'
};
// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('build-persistent', ['clean'], function() {
  return bundle();
});
gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});
gulp.task('watch', ['build-persistent'], function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });

  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
});

// WEB SERVER
// gulp.task('serve', function () {
//   browserSync({
//     server: {
//       baseDir: './'
//     }
//   });
// });
///////////////////////////////////////////


