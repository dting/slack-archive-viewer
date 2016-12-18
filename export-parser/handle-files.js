const Promise = require('bluebird');

const { Day } = require('../server/db');
const handleMessages = require('./handle-messages');

const createAssociations = function createAssociations(channel) {
  return ([channelDay]) => channelDay.setChannel(channel).then(() => channelDay);
};

const createOrUpdateChannelDay = function createOrUpdateChannelDay(channel, dateStr) {
  const channelDayId = `${channel.slackChannelId}.${dateStr}`;
  return Day
    .findOrCreate({ where: { channelDayId, dateStr } })
    .then(createAssociations(channel));
};

const handleChannelDay = function handleChannelDay(maps, channelName) {
  const channel = maps.channels.get(channelName);
  return ({ dateStr, file }) => createOrUpdateChannelDay(channel, dateStr)
    .then(handleMessages(maps, channel, require(file)));
};

const handleChannelDirectory = function handleChannelDirectory(maps) {
  return ({ name, files }) => Promise.all(files.map(handleChannelDay(maps, name)));
};

module.exports = function handleFiles(maps, files) {
  return () => Promise.all(files.map(handleChannelDirectory(maps)));
};
