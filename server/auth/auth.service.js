const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const config = require('../config/environment');
const { populateReqUser } = require('../api/user/user.auth');
const { populateReqUserTeam } = require('../api/team/team.auth');

const accessTokenHeader = function accessTokenHeader(req, res, next) {
  const { query, headers } = req;
  if (query && {}.hasOwnProperty.call(query, 'access_token')) {
    headers.authorization = `Bearer ${query.access_token}`;
  }
  next();
};

const validateJwt = expressJwt({ secret: config.secrets.session });

const signToken = function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresIn: 360000 }); // 100 hrs
};

const isAuthenticated = [accessTokenHeader, validateJwt, populateReqUser];

const isAuthorized = [isAuthenticated, populateReqUserTeam];

const setTokenCookie = function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  const token = signToken(req.user._id);
  res.cookie('token', token);
  return res.redirect('/');
};

module.exports = {
  accessTokenHeader,
  isAuthenticated,
  isAuthorized,
  populateReqUser,
  setTokenCookie,
  signToken,
  validateJwt,
};
