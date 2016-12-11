const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const errorHandler = require('errorhandler');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const paths = require('../../config/paths');
const config = require('./environment');

module.exports = function configExpress(app) {
  app.set('env', config.env);
  app.set('port', config.port);
  app.set('ip', config.ip);
  app.set('view engine', 'ejs');

  if (app.get('env') === 'production') {
    app.set('clientPath', paths.publicDirectory);
  } else {
    app.set('clientPath', paths.tmpDirectory);
  }
  app.use(express.static(app.get('clientPath')));

  if (app.get('env') !== 'production') {
    app.use(morgan('dev'));
  }

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());

  if (app.get('env') === 'development') {
    const {
      devMiddleware,
      hotMiddleware,
    } = require('./webpack'); // eslint-disable-line global-require
    app.use(devMiddleware);
    app.use(hotMiddleware);
    app.use(errorHandler());
  }
};
