const AdmZip = require('adm-zip');
const del = require('del');
const fs = require('fs');
const minimist = require('minimist');
const path = require('path');

const { tmpDir, prompts } = require('./constants');
const handleTeam = require('./handle-team');
const handleUsers = require('./handle-users');
const handleChannels = require('./handle-channels');
const handleMessages = require('./handle-messages');

const argv = minimist(process.argv.slice(2));
const help = argv.h;
const force = argv.f;
const exportFile = argv.file;
const teamDomain = argv.team;

if (help) {
  console.log(prompts.help);
  process.exit();
}

if (!exportFile) {
  console.log(prompts.missing);
  console.log(prompts.help);
  process.exit(1);
}

const zip = new AdmZip(path.resolve(exportFile));
zip.extractAllTo(tmpDir);

/** Callback to delete tmp directory upon completion or error */
const cleanup = function cleanup(exitCode = 0) {
  del([tmpDir]).then(() => process.exit(exitCode));
};

const users = require(`${tmpDir}/users.json`);
const channels = require(`${tmpDir}/channels.json`);

if (!users.length) {
  console.log(prompts.nousers);
  cleanup(1);
}

const messages = [];
zip.getEntries()
  .filter(entry => entry.isDirectory)
  .forEach(({ entryName }) => {
    const files = fs.readdirSync(`${tmpDir}/${entryName}`);
    const channelName = entryName.slice(0, entryName.length - 1);
    messages.push([channelName, files.map(file => `${tmpDir}/${entryName}${file}`)]);
  });

const maps = {};
const db = require('../server/db');

db.sequelize.sync({ force })
  .then(handleTeam(users, teamDomain, db, maps))
  .then(handleUsers(users, db, maps))
  .then(handleChannels(channels, db, maps))
  .then(handleMessages(messages, db, maps))
  .then(() => {
    console.log(`${exportFile} successfully processed...`);
    cleanup();
  })
  .catch((err) => {
    console.log(err);
    cleanup(1);
  });
