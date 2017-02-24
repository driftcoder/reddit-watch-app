const path = require('path');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    path: './dist',
    filename: '[name].js',
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {compact: true},
    }],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new ProgressBarPlugin(),
  ],
  stats: {
    assets: false,
    hash: false,
    version: false,
    timings: false,
  },
};
