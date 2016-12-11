const _ = require('lodash');
const path = require('path');

const baseSettings = {
  env: process.env.NODE_ENV || 'development',
  root: path.normalize(`${__dirname}/../../..`),
  port: process.env.PORT || 9000,
  ip: process.env.IP || '0.0.0.0',
  secrets: {
    session: process.env.APP_SECRET || 'app-secret',
  },
  slack: {
    clientID: process.env.SLACK_ID || 'id',
    clientSecret: process.env.SLACK_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/slack/callback`,
  },
};

let environmentSettings;
switch (baseSettings.env) {
  case 'production':
    environmentSettings = _.merge(baseSettings, require('./production'));
    break;
  case 'development':
  default:
    environmentSettings = _.merge(baseSettings, require('./development'));
    break;
}

module.exports = environmentSettings;
