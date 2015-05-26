var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var rename = require('gulp-rename');
var install = require('gulp-install');
var zip = require('gulp-zip');
var AWS = require('aws-sdk');
var fs = require('fs');
var runSequence = require('run-sequence');

// First we need to clean out the dist folder and remove the compiled zip file.
gulp.task('clean', function(cb) {
  del(['./dist', './dist.zip'], cb)
});

// The js task could be replaced with gulp-coffee as desired.
gulp.task('js', function() {
  gulp.src('index.js')
    .pipe(gulp.dest('dist/'))
});

// Here we want to install npm packages to dist, ignoring devDependencies.
gulp.task('npm', function() {
  gulp.src('./package.json')
    .pipe(gulp.dest('./dist/'))
    .pipe(install({production: true}));
});

// Next copy over environment variables managed outside of source control.
gulp.task('env', function() {
  gulp.src('./config.env.production')
    .pipe(rename('.env'))
    .pipe(gulp.dest('./dist'))
});

// Now the dist directory is ready to go. Zip it.
gulp.task('zip', function() {
  gulp.src(['dist/**/*', '!dist/package.json', 'dist/.*'])
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
});

// Per the gulp guidelines, we do not need a plugin for something that can be
// done easily with an existing node module. #CodeOverConfig
//
// Note: This presumes that AWS.config already has credentials. This will be
// the case if you have installed and configured the AWS CLI.
//
// See http://aws.amazon.com/sdk-for-node-js/
gulp.task('upload', function() {

  // TODO: This should probably pull from package.json
  AWS.config.region = 'us-east-1';
  var lambda = new AWS.Lambda();
  var functionName = 'slackNotify';

  lambda.getFunction({FunctionName: functionName}, function(err, data) {
    if (err) {
      if (err.statusCode === 404) {
        var warning = 'Unable to find lambda function ' + deploy_function + '. '
        warning += 'Verify the lambda function name and AWS region are correct.'
        gutil.log(warning);
      } else {
        var warning = 'AWS API request failed. '
        warning += 'Check your AWS credentials and permissions.'
        gutil.log(warning);
      }
    }

    console.log('data',  data.Configuration.FunctionArn);
    var params = {
      FunctionName: data.Configuration.FunctionArn
    };

    fs.readFile('./dist.zip', function(err, data) {
      params['ZipFile'] = data;
      lambda.updateFunctionCode(params, function(err, data) {
        console.log('update function', err, data);
        if (err) {
          var warning = 'Package upload failed. '
          warning += 'Check your iam:PassRole permissions.'
          gutil.log(warning);
        }
      });
    });
  });
});

// The key to deploying as a single command is to manage the sequence of events.
gulp.task('default', function(callback) {
  return runSequence(
    ['clean'],
    ['js', 'npm', 'env'],
    ['zip'],
    ['upload'],
    callback
  );
});