const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const paths = require('./paths');

module.exports = {
  debug: true,
  devtool: 'eval-cheap-source-map',
  entry: {
    app: [
      paths.polyfills,
      'webpack-hot-middleware/client?reload=true',
      paths.indexJs,
    ],
  },
  output: {
    path: paths.tmpDirectory,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min-[hash:6].js'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.indexHtml,
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: ['style', 'css'],
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: [
        ExtractTextPlugin.extract('style'),
        'css?sourceMap',
        'postcss',
        'sass?sourceMap',
      ],
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'url?prefix=font/&limit=5000',
    }, {
      test: /\.(png|jpg|jpeg|gif|woff)$/,
      loader: 'url-loader?limit=8192',
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },
};
