
const { resolvePath } = require("./utils/utils");
const tsImportPluginFactory = require('ts-import-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		main: resolvePath("src/App.tsx"),
	},
	output: {
		path: resolvePath("dist"),
		filename: "scripts/[name].[hash:8].js",
		chunkFilename: "scripts/[name].[chunkhash:8].chunk.js",
		publicPath: "./",
	},
	resolve: {
		alias: {
			"@": resolvePath("src"),
			"@page": resolvePath("src/pages"),
			"@component": resolvePath("src/components"),
			"@global": resolvePath("src/global"),
			"@store": resolvePath("src/store"),
			"@util": resolvePath("src/utils"),
			"@style": resolvePath("src/styles"),
			"@image": resolvePath("src/images"),
			"@api": resolvePath("src/apis"),
			"@module": resolvePath("src/modules"),
			"@hook": resolvePath("src/hooks"),
		},
        extensions: [".js", ".jsx", ".scss", ".sass", ".json", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
					},
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
							getCustomTransformers: () => ({
								before: [tsImportPluginFactory([
									{
										libraryDirectory: 'es',
										libraryName: "antd",
										style: true,
									},
									// {
									// 	libraryName: 'antd-mobile',
									// 	libraryDirectory: 'lib',
									// }
								])]
							}),
						}
					}
				]
			},
			{
				test: /\.(s?css|sass)$/,
				use: [
					"style-loader",
					"css-loader?sourceMap=true",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader?sourceMap=true",
					"less-loader",
				],
			}, {
				test: /\.(bmp|gif|jpe?g|png)$/,
				use: [{
					loader: "url-loader",
					options: {
						limit: 10,
						outputPath: "images/",
						name: "[name].[hash:8].[ext]",
						publicPath: "../images/",
					}
				}],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: resolvePath("dist/index.html"),
			template: resolvePath("public/index.tpl.html")
		}),
	]
}
