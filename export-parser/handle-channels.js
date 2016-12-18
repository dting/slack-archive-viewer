const Promise = require('bluebird');

const { Channel } = require('../server/db');

const createAssociations = function createAssociations(maps, entry) {
  const { team, people, bots } = maps;
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

const createOrUpdateChannel = function createOrUpdateChannel(maps) {
  return entry => Channel
    .upsert({
      slackChannelId: entry.id,
      channelName: entry.name,
      created: new Date(+entry.created * 1000),
      topic: entry.topic,
      purpose: entry.purpose,
      isArchived: entry.is_archived,
    })
    .then(createAssociations(maps, entry));
};

const populateMapsChannel = function populateMapsChannel(maps) {
  return channels => (
    maps.channels = new Map(channels.map(channel => ([channel.channelName, channel])))
  );
};

module.exports = function handleChannels(maps, channels) {
  return () => Promise.all(channels.map(createOrUpdateChannel(maps)))
    .then(populateMapsChannel(maps));
};
