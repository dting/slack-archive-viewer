const path = require('path');

const appDirectory = process.cwd();
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const clientDirectory = resolveApp('client');
function resolveClient(relativePath) {
  return path.resolve(clientDirectory, relativePath);
}

module.exports = {
  appDirectory,
  clientDirectory,
  indexHtml: resolveClient('index.html'),
  indexJs: resolveClient('index.js'),
  polyfills: resolveClient('config/polyfills'),
  publicDirectory: resolveApp('public'),
  tmpDirectory: resolveApp('.tmp'),
};
