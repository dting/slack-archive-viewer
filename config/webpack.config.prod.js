const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

const paths = require('./paths');

module.exports = {
  entry: {
    app: [
      paths.polyfills,
      paths.indexJs,
    ],
  },
  output: {
    path: paths.publicDirectory,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min-[hash:6].js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.indexHtml,
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
    }, {
      test: /\.scss$/,
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
