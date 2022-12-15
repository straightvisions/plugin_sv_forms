const path = require('path');

module.exports = {
	cache: true,
	entry: './block.js',
	output: {
		path: path.resolve(__dirname, '../dist'), // the bundle output path
		filename: 'sv-forms.build.min.js', // the name of the bundle
		publicPath: '/',
	},
	plugins: [],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, // .js and .jsx files
				exclude: /node_modules/, // excluding the node_modules folder
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(sa|sc|c)ss$/, // styles files
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	}
};