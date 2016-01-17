var gulp = require('gulp')
  , zip = require('gulp-zip')
  , del = require('del')
  , runSequence = require('run-sequence')
;

gulp.task('clean', function() {
  return del(['./build', './dist/ipmlambda.zip']);
});

gulp.task('copySrc', function() {
  return gulp.src('src/*.js')
  .pipe(gulp.dest('build'));
});

gulp.task('copyModule', function() {
  return gulp.src(['node_modules/@(twilio)/**'])
  .pipe(gulp.dest('build/node_modules'));
});

gulp.task('zip', ['copySrc', 'copyModule'], function() {
  return gulp.src('build/**/*')
  .pipe(zip('ipmlambda.zip'))
  .pipe(gulp.dest('dist'));
});

gulp.task('build', function(cb) {
  runSequence('clean', 'zip', cb);
});
