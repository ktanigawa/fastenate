var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var PathTo = {
  SassFiles: './sass/**/*.scss',
  PublicFolder: './public',
  PublicHtml: './public/index.html',
  PublicCss: './public/styles',
  PublicCssFiles: './public/styles/*.css',
  PublicJsFiles: './public/js/app.js'
};

gulp.task('watch-files', function (){
  gulp.watch(PathTo.SassFiles, ['compile-sass']);
  gulp.watch(PathTo.PublicCssFiles, ['html']);
  gulp.watch(PathTo.PublicJsFiles, ['html']);
});

gulp.task('compile-sass', function (){
  return gulp
          .src(PathTo.SassFiles, ['compile-sass'])
          .pipe(sass({ errLogToConsole: true }))
          .pipe(gulp.dest(PathTo.PublicCss))
          .pipe(connect.reload());

});

gulp.task('html', function (){
  return gulp.src('./public/*.html')
    .pipe(connect.reload());
});

gulp.task('public-server', function (){
  connect.server({
    root: './public',
    port: 8080,
    livereload: true
  });
});

gulp.task('default', ['public-server', 'compile-sass', 'watch-files']);
