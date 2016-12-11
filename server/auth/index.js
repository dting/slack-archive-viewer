const express = require('express');

const config = require('../config/environment');
const { SAVUser } = require('../db');

require('./slack/passport').setup(SAVUser, config);

const authRouter = express.Router();
authRouter.use('/slack', require('./slack'));

module.exports = authRouter;
