// This script takes our environment variables and converts it into a format
// the "now" cli command will understand, and then it runs the "now" command
// in order to deploy our application.
// @see https://zeit.co/now

const envVars = require('../config/envVars');
const execSync = require('child_process').execSync;
const appRootPath = require('app-root-path').toString();

function exec(command) {
  execSync(command, { stdio: 'inherit', cwd: appRootPath });
}

const cmdEnvVars = Object.keys(envVars)
  .map(key => `-e ${key}=${envVars[key]}`)
  .join(' ');

const cmd = `now ${cmdEnvVars}`;

exec(cmd);