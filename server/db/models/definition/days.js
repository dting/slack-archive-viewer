module.exports = function exports(sequelize, DataTypes) {
  return sequelize.define('Day', {
    _id: {
      type: DataTypes.INTEGER,
      field: '_id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    channelDayId: {
      type: DataTypes.STRING(20),
      field: 'channel_day',
      allowNull: false,
      unique: true,
    },
    dateStr: {
      type: DataTypes.STRING(10),
      field: 'date',
      allowNull: false,
    },
  }, {
    schema: 'public',
    tableName: 'days',
    timestamps: false,
  });
};

module.exports.initRelations = function initRelations() {
  delete module.exports.initRelations;
  const model = require('../index');
  const Day = model.Day;
  const Channel = model.Channel;
  const Message = model.Message;

  Day.hasMany(Message, {
    foreignKey: 'fk_day_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
  Day.belongsTo(Channel, {
    foreignKey: 'fk_channel_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  });
};
