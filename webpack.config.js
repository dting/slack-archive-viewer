const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const webpackMerge = require('webpack-merge');

const paths = require('./config/paths');

const vendor = [
  'classnames',
  'highlight.js',
  'isomorphic-fetch',
  'lodash',
  'moment',
  'react-addons-shallow-compare',
  'react-dom',
  'react-fontawesome',
  'react-redux',
  'react-router-redux',
  'react-router',
  'react-virtualized',
  'react',
  'redux-api-middleware',
  'redux-thunk',
  'redux',
  'slackdown',
];

const common = {
  context: paths.clientDirectory,
  entry: {
    vendor,
  },
  output: {
    filename: 'bundle.[hash:6].js',
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
