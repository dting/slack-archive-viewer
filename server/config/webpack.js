const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../webpack.config');

const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
});
const hotMiddleware = webpackHotMiddleware(compiler);

module.exports = {
  devMiddleware,
  hotMiddleware,
};
