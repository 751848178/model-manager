const webpack = require("webpack");
const baseWebpackConfig = require("./webpack.conf");
const merge = require("webpack-merge");
const CopyWepackPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const { resolvePath } = require("./utils/utils");

const devWebpackConfig = merge(baseWebpackConfig, {
	mode: "production",
	plugins: [
		// new CopyWepackPlugin([
		// 	{
		// 		from: resolveApp("public"),
		// 		to: resolveApp("dist/download/"),
		// 		ignore: ["index.tpl.html"]
		// 	}
		// ]),
		// new BundleAnalyzerPlugin()
	]
});

module.exports = devWebpackConfig;