const express = require('express');
const passport = require('passport');

const { sendToken } = require('../auth.service');
const config = require('../../config/environment');

const router = express.Router();

router
  .get('/', (req, res, next) => {
    const callbackURL = `${config.slack.callbackURL}${req.query.jwt ? '/jwt' : ''}`;
    passport.authenticate('slack', {
      scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team'],
      failureRedirect: '/',
      callbackURL,
      session: false,
    })(req, res, next);
  })
  .get('/callback', passport.authenticate('slack', {
    failureRedirect: '/',
    session: false,
  }), sendToken);


module.exports = router;
