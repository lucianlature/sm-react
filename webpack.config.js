import config from './config';

const { paths, env } = config;
const dllConfig = paths.build('webpack', 'dll.config');
const clientConfig = paths.build('webpack', env + '.config');
const serverConfig = paths.build('webpack', 'server.config');

const dll = require(dllConfig).default;
const client = require(clientConfig).default;
const server = require(serverConfig).default;

export default [ client, server, dll ];
