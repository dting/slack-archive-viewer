const configExpress = require('./express');
const configRoutes = require('./routes');

module.exports = function config(app) {
  configExpress(app);
  configRoutes(app);
};
