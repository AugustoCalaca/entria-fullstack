const path = require('path');

const getWorkspaces = require('get-yarn-workspaces');
const blacklist = require('metro-config/src/defaults/blacklist');

const workspaces = getWorkspaces(__dirname);

// Blacklists any react-native that doesn't come from packages/app
const blacklistRE = blacklist([ /(?<!packages\/app\/)node_modules\/react-native\/.*/g])

module.exports = {
  projectRoot: path.resolve(__dirname, '.'),

  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
    ...workspaces,
  ],

  resolver: {
    blacklistRE,
    extraNodeModules: {
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
  },
};
