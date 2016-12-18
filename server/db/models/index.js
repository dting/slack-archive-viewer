const model = {};
let initialized = false;

function init(sequelize) {
  delete module.exports.init;
  initialized = true;
  // Import model files and assign them to `model` object.
  model.Channel = sequelize.import('./definition/channels.js');
  model.Day = sequelize.import('./definition/days.js');
  model.Message = sequelize.import('./definition/messages.js');
  model.Team = sequelize.import('./definition/teams.js');
  model.User = sequelize.import('./definition/users.js');

  // All models are initialized. Now connect them with relations.
  require('./definition/channels.js').initRelations();
  require('./definition/days.js').initRelations();
  require('./definition/messages.js').initRelations();
  require('./definition/teams.js').initRelations();
  require('./definition/users.js').initRelations();
  return model;
}

module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
