import config from './config';

const { paths, env } = config;
const clientConfig = paths.build('webpack', env + '.config');
const serverConfig = paths.build('webpack', 'server.config');
const dllConfig = paths.build('webpack', 'dll.config');

const client = require(clientConfig).default;
const server = require(serverConfig).default;
const dll = require(dllConfig).default;

export default [ client, server, dll ];
