const path = require("path");
const CURRENT_WORKING_DIRECTORY = process.cwd();

const config = {
  mode: "production", // sets process.env.NODE_ENV to the given value, defaults to production if not set
  entry: path.join(CURRENT_WORKING_DIRECTORY, "./client/main.js"),
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
};

module.exports = config;
