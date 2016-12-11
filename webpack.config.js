const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const webpackMerge = require('webpack-merge');

const paths = require('./config/paths');

const vendor = [
  'classnames',
  'lodash',
  'moment',
  'react',
  'react-cookie',
  'react-dom',
  'react-redux',
  'react-router-redux',
  'redux',
  'redux-api-middleware',
  'redux-thunk',
  'slackdown',
];

const common = {
  context: paths.clientDirectory,
  entry: {
    vendor,
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.css', '.scss'],
  },
  postcss: () => [postcssImport, autoprefixer],
};

switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = webpackMerge(common, require('./config/webpack.config.prod'));
    break;
  case 'development':
  default:
    module.exports = webpackMerge(common, require('./config/webpack.config.dev'));
}
