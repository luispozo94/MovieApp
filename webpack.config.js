const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['./src/index.js'],//this setup for local machine
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: './bundle.js',
	},
	mode: process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/i,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
					},
				},
			},
			{
				test: /\.(scss|css)$/,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
				},
			},
		],
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './index.html',
		}),
	],
	devServer: {
		proxy: {
			'/api': 'http://localhost:3000/',
		},
	},
};
