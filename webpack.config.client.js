const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const CURRENT_WORKING_DIRECTORY = process.cwd();

const config = {
  name: "browser",
  mode: "development", // sets process.env.NODE_ENV to the given value, defaults to production if not set
  // devtool: "eval-source-map", //specifies how source maps are generated
  devtool: "cheap-module-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(CURRENT_WORKING_DIRECTORY, "./client/main.js"),
  ],
  output: {
    path: path.join(CURRENT_WORKING_DIRECTORY, "./dist"),
    filename: "bundle.js",
    publicPath: "/dist/", // allows specifying the base path for all assets in the application
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new NodePolyfillPlugin(),
  ],
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
};

module.exports = config;
