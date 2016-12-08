module.exports = {
  sequelize: {
    uri: process.env.DATABASE_URL || 'postgres://slarchive:slarchive@localhost:5432/slarchive',
    options: {
      logging: false,
      dialect: 'postgres',
    },
  },
};
