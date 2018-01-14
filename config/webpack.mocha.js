const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

var config = {
  entry: [
    'fetch-everywhere',
    path.join(__dirname, '../index.js'),
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'api-stubs': path.join(__dirname, '../src/api/stub/api-stubs.js'),
    }
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, '../dist')], { root: process.cwd() }),
  ],
  target: 'node',
}
module.exports = config
