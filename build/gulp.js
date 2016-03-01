var path = require('path'),
    gulp = require('gulp'),
    gutil = require("gulp-util"),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('webpack'),
    fork = require('child_process').fork,
    rename = require("gulp-rename"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    babel = require('gulp-babel'),
    rimraf = require('gulp-rimraf'),
    insert = require('gulp-insert-lines'),
    live = require('./inserts/live-injector'),
    entry = require('./inserts/entry'),
    server = null;

var HTML_PATH = {
        input: '../src/client/*/*.html',
        output: {
            dev: '../dist/client'
        }
    },
    LESS_PATH = {
        common: '../src/client/common',
        input: '../src/client/*/*.less',
        output: {
            dev: '../dist/client'
        }
    },
    CLIENT_PATH = {
        setup: '../src/client',
        output: {
            dev: '../dist/client'
        }
    },
    SERVER_PATH = {
        input: '../src/server/**/*.js',
        script: {
            input: '../src/server/app.js',
            dev: '../dist/server/app.js'
        },
        output: {
            dev: '../dist/server'
        }
    },
    SHARED_PATH = {
        input: '../src/shared/**/*.js',
        output: {
            dev: '../dist/shared'
        }
    },
    SERVER_BABEL_OPT = {
        presets: ['es2015-node'],
        moduleRoot: path.resolve('..'),
        sourceRoot: path.resolve('..')
    },
    ALL_OUT_PATH = ['../dist', '../prod'];

/**DEV**/
gulp.task('default', ['template:dev', 'less:dev', 'shared:dev', 'server:run:dev', 'webpack:dev']);

gulp.task('template:dev', function() {
    gulp.watch(HTML_PATH.input, ['template:dev']);

    return gulp.src(HTML_PATH.input)
        .pipe(insert({
            'before': /<\/head>$/,
            'lineBefore': '<script type="application/javascript">'+live()+'</script>'
        }))
        .pipe(gulp.dest(HTML_PATH.output.dev));
});

gulp.task('less:dev', function() {

    gulp.watch(LESS_PATH.input, ['less:dev']);

    return gulp.src(LESS_PATH.input)
        .pipe(sourcemaps.init())
        .pipe(less({
            //paths: [path.resolve(LESS_PATH.common)]
        }))
        .pipe(sourcemaps.write())
        .pipe(rename(function (path) {
            path.extname = ".less"
        }))
        .pipe(gulp.dest(LESS_PATH.output.dev));
});

gulp.task('server:run:dev', ['server:dev', 'sever:restart'], function (callback) {
    gulp.watch(SHARED_PATH.input, ['sever:restart']);
    gulp.watch(SERVER_PATH.input, ['sever:restart']);

    callback();
});

gulp.task('server:dev', function () {
    return gulp.src(SERVER_PATH.input)
        .pipe(sourcemaps.init())
        .pipe(babel(SERVER_BABEL_OPT))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(SERVER_PATH.output.dev));
});

gulp.task('shared:dev', function() {
    return gulp.src(SHARED_PATH.input)
        .pipe(sourcemaps.init())
        .pipe(babel(SERVER_BABEL_OPT))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(SHARED_PATH.output.dev));
});

gulp.task('sever:restart', ['server:dev', 'shared:dev'], function(callback){
    if(server)
        server.kill();

    server = fork(SERVER_PATH.script.dev, ['--harmony']);
    console.warn('server reload');
    callback();
});

/**CLEAN**/
gulp.task('clean', function() {
    return gulp.src(ALL_OUT_PATH, {read: false})
        .pipe(rimraf({force: true}));
});

/**WEBPACK**/
gulp.task('webpack:dev', function (callback) {
    var compiler = webpack({
        name: "Client",
        entry: entry(CLIENT_PATH.setup),
        output: {
            filename: "[name]/[name].js",
            path: CLIENT_PATH.output.dev
        },
        resolve: {
            root: [
                path.resolve('../src/client/common'),
                path.resolve('../src/shared')
            ]
        },
        devtool: 'eval-source-map',
        module: {
            loaders: [
                {
                    test: /\.vue$/,
                    loader: 'vue'
                },
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: [/node_modules/, /lib/]
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("[name].css")
        ],
        vue: {
            loaders: {
                js: 'babel'
            }
        }
    });

    compiler.watch({
        aggregateTimeout: 300,
        poll: true
    }, function(err, stats) {
        if(err)
            throw new gutil.PluginError("webpack", err);

        //console.log(stats.toString());
    });

    callback();
});