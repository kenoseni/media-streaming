const path = require("path");
const nodeExternals = require("webpack-node-externals");

const CURRENT_WORKING_DIRECTORY = process.cwd();

const config = {
  name: "server",
  //   mode option is not set explicitly here, it will be passed as required when running webpack command via CLI
  entry: [path.join(CURRENT_WORKING_DIRECTORY, "./src/index.js")],
  target: "node",
  output: {
    path: path.join(CURRENT_WORKING_DIRECTORY, "./dist"),
    filename: "server.bundled.js",
    publicPath: "/dist/", // allows specifying the base path for all assets in the application
    libraryTarget: "commonjs2",
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: "file-loader",
      },
    ],
  },
};

module.exports = config;
