const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require("gulp-babel");
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const overrideBrowserslist = [
  'ie >= 10',
  'Firefox >= 11',
  'Chrome >= 18',
  'Safari >= 6',
  'Opera >= 12.1',
];
const paths = {
  dist: 'assets',
  src: {
    image: 'src/**/*.+(png|jpg|jpeg|svg)',
    sass: 'src/**/**/*.scss',
    js: 'src/**/**/*.js',
    fonts: 'src/**/**/*.+(eot|ttf|woff|woff2|svg)',
  },
};

gulp.task('sass', done => {
  gulp.src(paths.src.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist,
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist))
    done();
});

gulp.task('scripts', done => {
  gulp.src(paths.src.js)
    .pipe(babel())
    .pipe(minify({
      ext:{
        min:'.min.js'
      },
      noSource: true,
    }))
    .pipe(gulp.dest(paths.dist));
  done();
});

gulp.task('images', done => {
  gulp.src(paths.src.image)
    .pipe(gulp.dest(paths.dist));
  done();
});

gulp.task('fonts', done => {
  gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist));
  done();
});

// default task
gulp.task('default', gulp.series('sass', 'scripts', 'images', 'fonts'), () => {
  gulp.watch(paths.src.js, ['scripts']);
  gulp.watch(paths.src.sass, ['sass']);
  gulp.watch(paths.src.image, ['images']);
  gulp.watch(paths.src.fonts, ['fonts']);
});

gulp.task('del', () => del.sync(paths.dist));
