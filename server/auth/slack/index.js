const express = require('express');
const passport = require('passport');

const { setTokenCookie } = require('../auth.service');

const router = express.Router();

router
  .get('/', passport.authenticate('slack', {
    scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team'],
    failureRedirect: '/login',
    session: false,
  }))
  .get('/callback', passport.authenticate('slack', {
    failureRedirect: '/login',
    session: false,
  }), setTokenCookie);

module.exports = router;
