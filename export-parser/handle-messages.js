const Promise = require('bluebird');

const { Message } = require('../server/db');

const createAssociations = function createAssociations(channelDay) {
  return messages => channelDay.setMessages(messages);
};

const createOrUpdateMessage = function createOrUpdateMessage(maps, channel) {
  const { bots, people, team } = maps;
  const teamId = team.teamId;
  const channelId = channel.channelId;
  return (entry) => {
    const { subtype, text, type, attachments, file } = entry;
    const timestamp = new Date(+entry.ts.split('.')[0] * 1000);
    const ts = `${channel.channelId}.${entry.ts}`;
    const userId = (people.get(entry.user) || bots.get(entry.bot_id) || {}).userId;
    return Message
      .upsert({
        teamId,
        channelId,
        userId,
        timestamp,
        ts,
        type,
        subtype,
        attachments,
        file,
        text: text || '',
      })
      .then(() => Message.findOne({ where: { ts } }));
  };
};

module.exports = function handleMessages(maps, channel, messages) {
  return channelDay => Promise.all(messages.map(createOrUpdateMessage(maps, channel)))
    .then(createAssociations(channelDay));
};
