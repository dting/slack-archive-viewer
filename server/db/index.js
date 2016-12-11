const Sequelize = require('sequelize');

const models = require('./models');
const config = require('../config/environment');

const sequelize = new Sequelize(config.sequelize.uri, config.sequelize.options);
models.init(sequelize);

const db = {
  Sequelize,
  sequelize,
};

db.SAVUser = db.sequelize.import('../api/user/user.model');

module.exports = Object.assign({}, db, models);
