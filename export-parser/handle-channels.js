const Promise = require('bluebird');

const createAssociations = function createAssociations(Channel, team, people, bots, entry) {
  return () => Channel
    .findOne({ where: { slackChannelId: entry.id } })
    .then((channel) => {
      if (!channel) {
        throw new Error(`Upserted channel: ${entry.id} (${entry.name}) not found...`);
      }
      const members = entry.members.map(member => people.get(member) || bots.get(member));
      return Promise.all([team.addChannels(channel), channel.setUsers(members)])
        .then(() => channel);
    });
};

const createOrUpdateChannel = function createOrUpdateChannel(db, maps) {
  const { Channel } = db;
  const { team, people, bots } = maps;
  return entry => Channel
    .upsert({
      slackChannelId: entry.id,
      channelName: entry.name,
      created: new Date(+entry.created * 1000),
      isArchived: entry.is_archived,
    })
    .then(createAssociations(Channel, team, people, bots, entry));
};

const populateMapsChannel = function populateMapsChannel(maps) {
  return channels => (
    maps.channels = new Map(channels.map(channel => ([channel.channelName, channel])))
  );
};

const createOrUpdate = function createOrUpdate(channels, db, maps) {
  return () => Promise.all(channels.map(createOrUpdateChannel(db, maps)))
    .then(populateMapsChannel(maps));
};

module.exports = createOrUpdate;
