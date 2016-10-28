/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */

const notifier = require('node-notifier');
const colors = require('colors');
import loggerFor from './log';

function createNotification(options = {}) {
  const title = options.title
    ? `${options.title.toUpperCase()}`
    : undefined;

  notifier.notify({
    title,
    message: options.message,
    open: options.open,
  });

  const level = options.level || 'info';
  const msg = `==> ${title} -> ${options.message}`;
  const log = loggerFor(title);

  switch (level) {
    /*
    case 'warn': log(colors.red(msg)); break;
    case 'error': log(colors.bgRed.white(msg)); break;
    case 'info':
    default: log(colors.green(msg));
    */
    case 'warn': log(msg); break;
    case 'error': log(msg); break;
    case 'info':
    default: log(msg);
  }
}

module.exports = createNotification;
