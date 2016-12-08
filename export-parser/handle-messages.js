const Promise = require('bluebird');

const createOrUpdateMessage = function createOrUpdateMessage(channel, db, maps) {
  const { Message } = db;
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
      });
  };
};

const handleChannelMessages = function handleChannelMessages(channelName, db, maps) {
  const channel = maps.channels.get(channelName);
  return (filename) => {
    const messages = require(filename);
    return Promise.all(messages.map(createOrUpdateMessage(channel, db, maps)))
      .then(result => [result.filter(Boolean).length, result.length]);
  };
};

const handleChannelDirectory = function handleChannelDirectory(db, maps) {
  return ([channelName, filenames]) => {
    const channelDirectories = filenames.map(handleChannelMessages(channelName, db, maps));
    return Promise.all(channelDirectories)
      .then(counts => counts.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]))
      .then(([aggInserted, aggTotal]) => console.log(
        channelName,
        `\n  ${aggInserted} new messages...`,
        `\n  ${aggTotal} total messages...\n`));
  };
};

const createOrUpdate = function createOrUpdate(messages, db, maps) {
  return () => Promise.all(messages.map(handleChannelDirectory(db, maps)));
};

module.exports = createOrUpdate;
