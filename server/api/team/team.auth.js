const { handleError, handleEntityNotFound, decorateRequest } = require('../../util');
const { Team } = require('../../db');

const auth = {};

auth.populateReqUserTeam = function populateReqUserTeam(req, res, next) {
  const slackTeamId = req.user.slack.team.id;
  return Team
    .findOne({
      where: { slackTeamId },
    })
    .then(handleEntityNotFound(res))
    .then(decorateRequest(req, 'team', next))
    .catch(handleError(res));
};

module.exports = auth;
