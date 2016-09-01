global.devBuild = process.env.NODE_ENV !== 'production';

var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('less', function(){
  return gulp.src('./client/assets/less/board.less')
    .pipe(less())
    .pipe(gulp.dest('./client/public/css'));
});
