var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../dist/server/schema.json');

module.exports = getBabelRelayPlugin(schema.data);
