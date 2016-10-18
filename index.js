import { createMonitor } from 'spawn-monitor';
import config from './config';

const { paths, globals } = config;
const __DEV__ = globals.__DEV__;
const __PROD__ = globals.__PROD__;

if (__PROD__) {
  require(paths.bin('client'));
  require(paths.bin('graphql'));
}

if (__DEV__) {
  createMonitor({
    script: paths.bin('relay'),
    key: 'relay',
  });

  createMonitor({
    script: paths.bin('graphql'),
    key: 'graphql',
  });

  createMonitor({
    script: paths.bin('devServer'),
    key: 'dev-server',
  });

  createMonitor({
    script: paths.bin('client'),
    key: 'client',
  });
}

// createMonitor({
//   script: './bin/test',
//   key: 'test',
// });
