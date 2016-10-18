// @flow

import path from 'path';
import Koa from 'koa';
import compress from 'koa-compress';
import favicon from 'koa-favicon';
import proxy from 'koa-proxy';
import mount from 'koa-mount';
import statics from 'koa-static';
import convert from 'koa-convert';

import config from '../config';
import renderClient from './utils/server/renderClient';

const {
  globals,
  paths,
  webpackPublicPath
} = config;

const __DEV__ = globals.__DEV__;
const app = new Koa();

app.use(compress());
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));


if (__DEV__) {
  app.use(mount('/build', convert(proxy({ host: webpackPublicPath }))));
} else {
  app.use(mount('/build', statics(paths.dist('client'))));
}

app.use(renderClient());

export default app;
