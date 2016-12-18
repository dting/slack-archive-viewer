const Promise = require('bluebird');

const { User } = require('../server/db');

const createAssociations = function createAssociations(team, entry) {
  return isInsert => User
    .findOne({ where: { slackUserId: entry.id } })
    .then((user) => {
      if (!user) {
        throw new Error(`Upserted user: ${entry.id} (${entry.name}) not found...`);
      }
      return isInsert ? team.addUsers(user).then(() => user) : user;
    });
};

const createOrUpdateUser = function createOrUpdateUser({ team }) {
  return entry => User
    .upsert({
      slackUserId: entry.id,
      userName: entry.name,
      deleted: entry.deleted,
      profile: entry.profile,
      isBot: entry.is_bot,
    })
    .then(createAssociations(team, entry));
};

const populateMapsUsers = function populateMapsUsers(maps) {
  return (users) => {
    const bots = new Map();
    const people = new Map();
    users.forEach((user) => {
      if (user.isBot) {
        bots.set(user.profile.bot_id, user);
      } else {
        people.set(user.slackUserId, user);
      }
    });
    maps.bots = bots;
    maps.people = people;
  };
};

module.exports = function handleUser(maps, users) {
  return () => Promise.all(users.map(createOrUpdateUser(maps)))
    .then(populateMapsUsers(maps));
};
