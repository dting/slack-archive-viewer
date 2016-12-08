module.exports = {
  ip: process.env.IP || undefined,
  port: process.env.PORT || 8080,
  sequelize: {
    uri: process.env.DATABASE_URL,
    options: {
      logging: false,
      dialect: 'postgres',
    },
  },
};
