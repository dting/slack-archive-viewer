module.exports = function exports(sequelize, DataTypes) {
  return sequelize.define('Channel', {
    channelId: {
      type: DataTypes.INTEGER,
      field: 'channel_id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    slackChannelId: {
      type: DataTypes.TEXT,
      field: 'slack_channel_id',
      allowNull: false,
      unique: true,
    },
    channelName: {
      type: DataTypes.TEXT,
      field: 'channel_name',
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      field: 'created',
      allowNull: false,
    },
    topic: {
      type: DataTypes.JSONB,
      field: 'topic',
      allowNull: false,
    },
    purpose: {
      type: DataTypes.JSONB,
      field: 'purpose',
      allowNull: false,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      field: 'is_archived',
      allowNull: false,
    },
  }, {
    schema: 'public',
    tableName: 'channels',
    timestamps: false,
  });
};

module.exports.initRelations = function initRelations() {
  delete module.exports.initRelations;
  const model = require('../index');
  const Channel = model.Channel;
  const Message = model.Message;
  const Team = model.Team;
  const User = model.User;

  Channel.hasMany(Message, {
    foreignKey: 'channel_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
  Channel.belongsToMany(Team, {
    through: 'team_channel',
    foreignKey: 'channel_id',
    otherKey: 'team_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
  Channel.belongsToMany(User, {
    through: 'user_channel',
    foreignKey: 'channel_id',
    otherKey: 'user_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
};
