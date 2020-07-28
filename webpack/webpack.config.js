const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './index.js', // The file to start bundling from
    output: {
        path: path.join(__dirname, '/public/js'),  // output dir
        publicPath: '/js/',  // path to serve file on
        filename: 'bundle.js'  // file name
    },
    devServer: {
        contentBase: './public/',  // dev server file location
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({}), // HMR plugin
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'  // Loader to use for js and jsx files
            }
        }]
    },
};