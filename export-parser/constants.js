const path = require('path');

const tmpDir = path.resolve(__dirname, '../tmp');
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
  tmpDir,
  prompts,
};
