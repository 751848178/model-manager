const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolvePath } = require("./utils/utils");

const config = require("./webpack.conf");

module.exports = merge(config, {
	mode: "development",
	output: {
		path: resolvePath("server"),
		filename: "scripts/[name].[hash:8].js",
		chunkFilename: "scripts/[name].[chunkhash:8].chunk.js",
		publicPath: "/",
	},
	devtool: 'inline-source-map',
	devServer: {
		hot: true,
		hotOnly: true,
		inline: true,
		host: "0.0.0.0",
		useLocalIp: true,
		historyApiFallback: {
			rewrites: [
				{ from: /./, to: "/index.html" }
			]
		},
		stats: {
			// 添加资源信息
			assets: true,
		},
		publicPath: "/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: resolvePath("server/index.html"),
			template: resolvePath("public/index.tpl.html")
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
});