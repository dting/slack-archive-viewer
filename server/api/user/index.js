const express = require('express');

const { isAuthenticated } = require('../../auth/auth.service');
const controller = require('./user.controller');

const userRouter = express.Router();

/**
 * /api/users/me
 *
 * GET: Get authenticated user profile
 * @requires isAuthenticated
 */
userRouter.get('/me', isAuthenticated, controller.me);

module.exports = userRouter;
