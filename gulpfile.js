var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    notify      = require('gulp-notify'),
    sass        = require('gulp-sass'),
    less        = require('gulp-less'),
    path        = require('path');
    cssmin      = require('gulp-cssmin');
    rename      = require('gulp-rename');
    concat      = require('concat');

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



var sourceDir = './app/js';
var buildDir = './build';
 
var Del = require('del');
var ESLlint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var Export = require('gulp-export');
var Babel = require('gulp-babel');
 
gulp.task('clean', cb => {
  return Del([buildDir], cb);
});
 
gulp.task('js-compile', ['clean'], function() {
  return gulp.src([`${sourceDir}/**/*.js`])
    // .pipe(ESLlint())
    // .pipe(ESLlint.format())
    // .pipe(ESLlint.failAfterError())
    .pipe(Export({
        context: './src',
        exclude: /_/,           // excluded all files with underscore
        exportType: 'default',  // export as default can be: named, default and global
    }))
    .pipe(sourcemaps.init())
    .pipe(Babel({
      presets: ['es2015']
    }))
    .pipe(concat("main.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildDir));
});
 

// var transpile  = require('gulp-es6-module-transpiler');
 
// gulp.task('build', function() {
//     return gulp.src('src/**/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(transpile({
//             formatter: 'bundle'
//         }))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('lib'));
//  })



 var babel = require('gulp-babel');
//     browserify = require('browserify'),
//     source = require('vinyl-source-stream'),
//     buffer = require('vinyl-buffer'),
//     rename = require('gulp-rename'),
//     uglify = require('gulp-uglify'),
//     del = require('del');
// var recast = require('recast');

// gulp.task('clean-temp', function(){
//   return del(['dest2']);
// });

// gulp.task('es6-commonjs',['clean-temp'], function(){
//   return gulp.src(['app/js/**/*.js'])
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(gulp.dest('dist2/'));
// });


// var babelify = require("babelify");

// var browserify = require('gulp-browserify');
// Basic usage 
// Basic usage 

gulp.task('scripts', function() {
  // Single entry point to browserify 
  return gulp.src('app/js/**/*.js')
      .pipe(babel({
        presets: ["es2015"]
      }))
      // .pipe(concat('all.js'))
      .pipe(gulp.dest('./build/'));
});


// gulp.task('bundle', function() {
//     gulp.src(['app/js/**/*.js']) // entry point
//         .pipe(browserify({ debug: true }))
//         .pipe(gulp.dest('./dist2'))
// });

// gulp.task('es6-compile', function() {
//   browserify({ debug: true })
//     .transform(babelify.configure({ ["es2015","react", "stage-0"],"react", "stage-0"] }))
//     .require('./app/js/**/*.js', { entry: true })
//     .bundle()
//     .pipe(gulp.dest('./public/dest/javascripts'));
// });