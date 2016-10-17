#!/usr/bin/env node_modules/.bin/babel-node

import path from 'path';
import { Gaze } from 'gaze';
import config from '../config';
import { spawn } from 'pty.js';

const { paths } = config;

const gaze = new Gaze(paths.data('schema', '**', '*.js'));
const compile = (changed) => new Promise((resolve, reject) => {
  if (changed) {
    console.log('[SCHEMA CHANGED] %s', changed);
  }

  spawn(path.join(__dirname, '..', 'scripts', 'relay-schema.js'))
    .on('end', () => resolve(changed));
  setTimeout(reject, 5 * 60 * 1000);
});

gaze.on('all', (event, filename) => {
  const changed = filename.replace(paths.data('schema') + '/', '');
  compile(changed);
});
