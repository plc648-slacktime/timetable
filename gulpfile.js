var gulp = require('gulp');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var fork = require('child_process').fork;
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var server = null;
var path = require('path');

//WEBPACK
gulp.task('webpack', function(){
	return gulp.src('src/client/*')
		.pipe(webpack(require('./build/webpack.config.js')))
		.pipe(gulp.dest('dist/client/'))
		.pipe(connect.reload());
});

//FOLDER COPY
gulp.task('vendor', function(){
	return gulp.src('src/client/vendor/**/*')
		.pipe(gulp.dest('dist/client/vendor'))
		.pipe(connect.reload());
});

gulp.task('shared', function() {
	return gulp.src('src/shared/**/*')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015-node'],
			moduleRoot: path.resolve('.'),
			sourceRoot: path.resolve('.')
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/shared/'));
});

gulp.task('index', function(){
	return gulp.src('src/client/*/*.html')
		.pipe(gulp.dest('dist/client'));
});

//FILE SERVER
gulp.task('webserver:watch', function() {
	connect.server({
		livereload: true,
		root: 'dist/client'
	});
});

//SERVER
gulp.task('server', function () {
	return gulp.src('src/server/**/*')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015-node'],
			moduleRoot: path.resolve('.'),
			sourceRoot: path.resolve('.')
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/server/'));
});

//CLEAN
gulp.task('clean', function() {
	return gulp.src('dist', {read: false})
		.pipe(clean({force: true}));
});

gulp.task('server:watch', ['sever:restart'], function (callback) {
	gulp.watch('src/shared/**/*', ['sever:restart']);
	gulp.watch('src/server/**/*', ['sever:restart']);

	callback();
});

gulp.task('sever:restart', ['server', 'shared'], function(callback){
	if(server)
		server.kill();

	server = fork('dist/server/app.js', ['--harmony']);
	console.warn('server reload');
	callback();
});

// Default task
gulp.task('default', ['webpack', 'vendor', 'index', 'webserver:watch', 'server:watch']);
