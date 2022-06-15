const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // The file to start bundling from
  output: {
    path: path.join(__dirname, "../public/"), // output dir
    filename: "bundle.js", // file name
  },
  plugins: [
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: "main.css?[hash]",
      chunkFilename: "[id].css",
    }),

    new htmlWebpackPlugin({
      hash: true,
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Loader to use for js and jsx files
        },
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
          },
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "../",
            outputPath: (url, resourcePath, context) => {
              return url;
            },
            name: "assets/fonts/[name].[ext]?[hash]",
          },
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "../",
            name: "assets/media/[name].[ext]?[hash]",
          },
        },
      },
    ],
  },
};
