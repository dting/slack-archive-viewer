const express = require('express');

const { isAuthorized } = require('../../auth/auth.service');
const controller = require('./channel.controller');

const channelRouter = express.Router();

/**
 * /api/channels/
 *
 * GET: Get channels for authenticated user's team
 * @requires isAuthorized
 */
channelRouter.get('/', isAuthorized, controller.index);

/**
 * /api/channels/:channelId
 *
 * GET: Get channel info and messages for a specific channel
 * @requires isAuthorized
 */
channelRouter.get('/:channelId', isAuthorized, controller.get);

module.exports = channelRouter;
