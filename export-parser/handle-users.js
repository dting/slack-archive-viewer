const Promise = require('bluebird');

const createAssociations = function createAssociations(User, team, entry) {
  return isInsert => User
    .findOne({ where: { slackUserId: entry.id } })
    .then((user) => {
      if (!user) {
        throw new Error(`Upserted user: ${entry.id} (${entry.name}) not found...`);
      }
      return isInsert ? team.addUsers(user).then(() => user) : user;
    });
};

const createOrUpdateUser = function createOrUpdateUser({ User }, { team }) {
  return entry => User
    .upsert({
      slackUserId: entry.id,
      userName: entry.name,
      deleted: entry.deleted,
      profile: entry.profile,
      isBot: entry.is_bot,
    })
    .then(createAssociations(User, team, entry));
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

const usersHandler = function usersHandler(users, db, maps) {
  return () => Promise.all(users.map(createOrUpdateUser(db, maps)))
    .then(populateMapsUsers(maps));
};

module.exports = usersHandler;
