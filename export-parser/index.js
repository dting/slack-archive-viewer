const AdmZip = require('adm-zip');
const del = require('del');
const fs = require('fs');
const minimist = require('minimist');
const path = require('path');

const { zipTmpDir, prompts } = require('./constants');
const db = require('../server/db');
const handleTeam = require('./handle-team');
const handleUsers = require('./handle-users');
const handleChannels = require('./handle-channels');
const handleFiles = require('./handle-files');

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
zip.extractAllTo(zipTmpDir);

/** Callback to delete tmp directory upon completion or error */
const cleanup = function cleanup(exitCode = 0) {
  del([zipTmpDir]).then(() => process.exit(exitCode));
};

const users = require(`${zipTmpDir}/users.json`);
const channels = require(`${zipTmpDir}/channels.json`);

if (!users.length) {
  console.log(prompts.nousers);
  cleanup(1);
}

/**
 * Group files by directories, mapping directory (channel) names to the files inside
 *
 * Each directory contains json files, named by date, containing messages for a specific channel.
 */
const groupFiles = function groupFiles({ entryName }) {
  const files = fs.readdirSync(`${zipTmpDir}/${entryName}`);
  return {
    name: entryName.slice(0, entryName.length - 1),
    files: files.map(file => ({
      dateStr: file.split('.')[0],
      file: `${zipTmpDir}/${entryName}${file}`,
    })),
  };
};

const files = zip.getEntries().filter(entry => entry.isDirectory).map(groupFiles);
const maps = {};

db.sequelize.sync({ force })
  .then(handleTeam(maps, users, teamDomain))
  .then(handleUsers(maps, users))
  .then(handleChannels(maps, channels))
  .then(handleFiles(maps, files))
  .then(() => {
    console.log(`${exportFile} successfully processed...`);
    cleanup();
  })
  .catch((err) => {
    console.log(err);
    cleanup(1);
  });
