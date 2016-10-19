#!/usr/bin/env node_modules/.bin/babel-node

/**
 * Created by Lucian on 12/10/2016.
 */

// import { startDev } from './tools/dx';
import {
  client,
  server,
} from '../build';
import config from '../config';

const {
  host,
  webpackPort: port,
  globals
} = config;

const __DEV__ = globals.__DEV__;

server.watch({
  noInfo: true,
  quiet: true,
  stats: { colors: true },
}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    if (__DEV__) {
      console.log('Compiled server with Webpack');
    } else {
      console.log(stats.toJson({
        color: true,
        allChunks: false,
      }));
    }
  }
});

client.listen(port, host, (err) => {
  console.log(`===> 🚧  Dev Server is running at http://${host}:${port}`);
  // startDev(port, host, err);
});
