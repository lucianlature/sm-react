// @flow

import path from 'path';
import Koa from 'koa';
import compress from 'koa-compress';
import favicon from 'koa-favicon';
import proxy from 'koa-proxy';
import mount from 'koa-mount';
import serve from 'koa-static';

import config from '../config';
import renderClient from './utils/server/renderClient';

const {
  globals,
  paths,
  webpackPublicPath,
} = config;

const __DEV__ = globals.__DEV__;
const app = new Koa();

app.use(compress());
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

if (__DEV__) {
  app.use(mount('/build', proxy({ host: webpackPublicPath })));
} else {
  app.use(mount('/build', serve(paths.dist('client'))));
}

app.use(renderClient());

export default app;
