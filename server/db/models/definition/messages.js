module.exports = function exports(sequelize, DataTypes) {
  return sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamId: {
      type: DataTypes.INTEGER,
      field: 'team_id',
      allowNull: false,
      references: {
        model: 'teams',
        key: 'team_id',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'RESTRICT',
    },
    channelId: {
      type: DataTypes.INTEGER,
      field: 'channel_id',
      allowNull: false,
      references: {
        model: 'channels',
        key: 'channel_id',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'RESTRICT',
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'RESTRICT',
    },
    timestamp: {
      type: DataTypes.DATE,
      field: 'timestamp',
      allowNull: false,
    },
    ts: {
      type: DataTypes.STRING,
      field: 'ts',
      allowNull: false,
      unique: true,
    },
    text: {
      type: DataTypes.TEXT,
      field: 'text',
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      field: 'type',
      allowNull: false,
    },
    subtype: {
      type: DataTypes.STRING,
      field: 'sub_type',
      allowNull: true,
    },
    attachments: {
      type: DataTypes.JSONB,
      field: 'attachments',
      allowNull: true,
    },
    file: {
      type: DataTypes.JSONB,
      field: 'file',
      allowNull: true,
    },
  }, {
    schema: 'public',
    tableName: 'messages',
    timestamps: false,
  });
};

module.exports.initRelations = function initRelations() {
  delete module.exports.initRelations;
  const model = require('../index');
  const Message = model.Message;
  const Channel = model.Channel;
  const Team = model.Team;
  const User = model.User;

  Message.belongsTo(Channel, {
    foreignKey: 'channel_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
  Message.belongsTo(Team, {
    foreignKey: 'team_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
  Message.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
};
