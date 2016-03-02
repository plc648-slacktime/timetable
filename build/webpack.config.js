var webpack = require('webpack');
var entry = require('./entry');
var path = require('path');

module.exports =  {
	entry: entry('./src/client'),
	output: {
		path: "/dist/client",
		publicPath: "/dist/client/",
		filename: "[name]/[name].js"
	},
	watch: true,
	devtool: 'inline-source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules|vue\/src|vue-router\//,
				loader: 'babel'
			},
			{
				test: /\.less$/,
				loaders: ['style?sourceMap', 'css?sourceMap', 'less?sourceMap']
			},
			{
				test: /\.vue$/,
				loader: 'vue'
			}
		]
	},
	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	},
	resolve: {
		modulesDirectories: ['node_modules'],
		root: [
			path.resolve('./src/client/common'),
			path.resolve('./src/shared')
		]
	}
};
