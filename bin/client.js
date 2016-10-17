#!/usr/bin/env node_modules/.bin/babel-node

/**
 * Created by Lucian on 12/10/2016.
 */

import config from '../config';
import app from '../src';

const {
  host,
  port
} = config;

app.listen(port, host, () => {
  console.log(`Client running at http://${host}:${port}`);
});
