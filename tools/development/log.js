import chalk from 'chalk';
import notifier from 'node-notifier';
import moment from 'moment';
import pad from 'pad';
import timeDiff from '../utils/timeDiff';

const colors = ['red', 'green', 'yellow', 'blue', 'magenta'];
const colorCache = {};
let colorIndex = colors.length;

export default function loggerFor(key) {
    return function log(message) {
        let color = colorCache[key];
        if (!color) {
            color = colorCache[key] = colors[--colorIndex];
        }
        const bgColor = `bg${color.charAt(0).toUpperCase() + color.slice(1)}`;
        message.toString().split('\n')
            .filter((line) => line.trim().length > 0)
            .forEach((line) => {
            /*
            notifier.notify({
                title: type,
                message: line,
                sound: false,
            });
            */
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
