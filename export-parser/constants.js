const path = require('path');

const zipTmpDir = path.resolve(__dirname, '../ztmp');
const prompts = {
  help: `
Usage:
  node read-archive.js [-options] [--team=teamName] --file=path/to/zip

  (--team required if adding archive export for a new team)
  options:
    -h    print this help message
    -f    force sync db (drops tables before creating)
`,
  missing: 'Missing required argument(s)...',
  nousers: 'Exports with no users cannot be processed...',
};

module.exports = {
  zipTmpDir,
  prompts,
};
