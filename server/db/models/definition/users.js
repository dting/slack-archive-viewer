module.exports = function exports(sequelize, DataTypes) {
  return sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    slackUserId: {
      type: DataTypes.TEXT,
      field: 'slack_user_id',
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.TEXT,
      field: 'user_name',
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      field: 'deleted',
      allowNull: false,
    },
    profile: {
      type: DataTypes.JSONB,
      field: 'profile',
      allowNull: false,
    },
    isBot: {
      type: DataTypes.BOOLEAN,
      field: 'is_bot',
      allowNull: false,
    },
  }, {
    schema: 'public',
    tableName: 'users',
    timestamps: false,
  });
};

module.exports.initRelations = function initRelations() {
  delete module.exports.initRelations;
  const model = require('../index');
  const User = model.User;
  const Message = model.Message;
  const Channel = model.Channel;
  const Team = model.Team;

  User.hasMany(Message, {
    foreignKey: 'user_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
  User.belongsToMany(Channel, {
    through: 'user_channel',
    foreignKey: 'user_id',
    otherKey: 'channel_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
  User.belongsToMany(Team, {
    through: 'team_user',
    foreignKey: 'user_id',
    otherKey: 'team_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
};
