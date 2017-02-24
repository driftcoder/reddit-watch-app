const path = require('path');

const _ = require('lodash');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const Webpack = require('webpack');

let config = require('./webpack.config.js');

config.plugins = [];

module.exports = _.merge({}, config, {
  watch: true,
  devtool: 'eval-source-map',
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new ProgressBarPlugin(),
  ],
});
