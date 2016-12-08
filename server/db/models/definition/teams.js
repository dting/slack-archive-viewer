module.exports = function exports(sequelize, DataTypes) {
  return sequelize.define('Team', {
    teamId: {
      type: DataTypes.INTEGER,
      field: 'team_id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    slackTeamId: {
      type: DataTypes.TEXT,
      field: 'slack_team_id',
      allowNull: false,
    },
    teamDomain: {
      type: DataTypes.TEXT,
      field: 'team_domain',
      allowNull: false,
    },
  }, {
    schema: 'public',
    tableName: 'teams',
    timestamps: false,
  });
};

module.exports.initRelations = function initRelations() {
  delete module.exports.initRelations;
  const model = require('../index');
  const Team = model.Team;
  const Message = model.Message;
  const Channel = model.Channel;
  const User = model.User;

  Team.hasMany(Message, {
    foreignKey: 'team_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
  Team.belongsToMany(Channel, {
    through: 'team_channel',
    foreignKey: 'team_id',
    otherKey: 'channel_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
  Team.belongsToMany(User, {
    through: 'team_user',
    foreignKey: 'team_id',
    otherKey: 'user_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
};
