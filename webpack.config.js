const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const mode = process.env.NODE_ENV || 'development'
const production = mode === 'production'

module.exports = {
	mode,
	devtool: production ? false : 'source-map',
	entry: {
		app: [
			'./src/index.js'
			]
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	devServer: {
		host: '0.0.0.0',
		port: 8083,
		inline: true,
		hot: true,
		contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],
		historyApiFallback: {
			index: 'index.html'
		}
	},
	"module": {
		"rules": [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				include: path.join(__dirname, 'src'),
				options: {
					cacheDirectory: true
				}
			},
            {
                test: /\.(png|jpeg|ttf|svg|gif)$/,
                use: {
                	loader: 'url-loader',
                	options: {
	                	name: '[path][name].[hash].[ext]',
	                	limit: 8192
                	}
                } 
            },
			{
				test: /\.(css|sass|scss)$/,
				use:[
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					ecma: 8,
					sourceMap: true,
					comments: false
				}
			}),
		]
	}
}