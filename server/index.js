/* eslint-disable no-console */
const chalk = require('chalk');
const express = require('express');

const config = require('./config');
const db = require('./db');

const app = express();
config(app);

const startListening = function startListening() {
  app.listen(app.get('port'), app.get('ip'), () => {
    console.info(chalk.cyan(`Listening on port ${app.get('port')}`));
  });
};

db.sequelize.sync()
  .then(() => console.info(chalk.white('\nPostgres connection established...')))
  .then(startListening)
  .catch(err => console.log(chalk.red('Server failed to start due to error: %s', err)));
