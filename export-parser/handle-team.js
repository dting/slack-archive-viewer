const { prompts } = require('./constants');

const { Team } = require('../server/db');

const populateMapsTeam = function populateMapsTeam(maps) {
  return team => (maps.team = team);
};

module.exports = function handleTeam(maps, users, teamDomain) {
  const slackTeamId = users[0].team_id;
  return () => Team
    .findOne({ where: { slackTeamId } })
    .then((team) => {
      if (team) return team;
      if (!teamDomain) {
        console.log(prompts.missing);
        console.log(prompts.help);
        throw new Error('Missing teamDomain for adding new team');
      }
      return Team.create({ slackTeamId, teamDomain });
    })
    .then(populateMapsTeam(maps));
};
