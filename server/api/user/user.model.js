module.exports = function exports(sequelize, DataTypes) {
  const User = sequelize.define('SAVUser', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    slack: DataTypes.JSONB,
  });
  return User;
};
