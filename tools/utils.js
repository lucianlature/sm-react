const CPU_COUNT = require('os').cpus().length;
const HappyPack = require('happypack');
const notifier = require('node-notifier');
const colors = require('colors');

import chalk from 'chalk';
import moment from 'moment';
import pad from 'pad';

const timers: {[key: string]: Date} = {};

// This determines how many threads a HappyPack instance can spin up.
// See the plugins section of the webpack configuration for more.
const happyPackThreadPool = HappyPack.ThreadPool({ // eslint-disable-line new-cap
  size: CPU_COUNT >= 4
    ? Math.round(CPU_COUNT / 2)
    : 2,
});

// Generates a HappyPack plugin.
// @see https://github.com/amireh/happypack/
function happyPackPlugin({ name, loaders }) {
  return new HappyPack({
    id: name,
    verbose: false,
    threadPool: happyPackThreadPool,
    loaders,
  });
}

// :: [Any] -> [Any]
function removeEmpty(x) {
  return x.filter(y => !!y);
}

// :: bool -> (Any, Any) -> Any
function ifElse(condition) {
  return (then, or) => (condition ? then : or);
}

// :: ...Object -> Object
function merge() {
  const funcArgs = Array.prototype.slice.call(arguments); // eslint-disable-line prefer-rest-params

  return Object.assign.apply(
    null,
    removeEmpty([{}].concat(funcArgs))
  );
}

function createNotification(options = {}) {
  const title = options.title
    ? `${options.title.toUpperCase()}`
    : undefined;
  const log = loggerFor(title);

  notifier.notify({
    title,
    message: options.message,
    open: options.open,
  });

  const level = options.level || 'info';
  let msg = `🔸 ${title} -> ${options.message}`;

  switch (level) {
    case 'warn': log(colors.red(msg)); break;
    case 'error': {
      msg = `${title} : ${options.message}`;
      log('❗️ ' + colors.bgRed.white(msg)); 
      break;
    }
    case 'info':
    default: log(colors.green(msg));
  }
}

function timeDiff(type: string): string {
  const date: Date = new Date();
  const diff: number = timers[type] ? date - timers[type] : 0;

  let diffString: string = '';
  if (diff >= 1000 * 60 * 60) {
    diffString = Math.floor(diff / 1000 / 60 / 60).toString() + 'h';
  } else if (diff >= 1000 * 60) {
    diffString = Math.floor(diff / 1000 / 60).toString() + 'm';
  } else if (diff >= 1000) {
    diffString = Math.floor(diff / 1000).toString() + 's';
  } else {
    diffString = diff.toString() + 'ms';
  }

  timers[type] = date;

  return `+${diffString}`;
};

const logColors = ['red', 'green', 'yellow', 'blue', 'magenta'];
const colorCache = {};
let colorIndex = logColors.length;

function loggerFor(key) {
    return function log(message) {
        let color = colorCache[key];
        if (!color) {
            color = colorCache[key] = logColors[--colorIndex];
        }
        const bgColor = `bg${color.charAt(0).toUpperCase() + color.slice(1)}`;
        
        message.toString().split('\n')
            .filter((line) => line.trim().length > 0)
            .forEach((line) => {
              console.log(
                  chalk.yellow(moment(new Date()).format('HH:mm:ss')),
                  chalk[color](key.slice(0, 1)),
                  chalk[color](pad(timeDiff(key), 7)),
                  chalk[bgColor](' '),
                  line
              );
            });
    }
}

module.exports = {
  removeEmpty,
  ifElse,
  merge,
  happyPackPlugin,
  createNotification,
  timeDiff,
  loggerFor
};