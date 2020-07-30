const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const webCommon = require("./webpack.common.config");

module.exports = merge(webCommon, {
  mode: "production",
    
});
