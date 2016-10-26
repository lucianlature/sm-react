// @flow

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

if (__DEV__) {
  app.use(mount('/build', convert(proxy({ host: webpackPublicPath }))));
} else {
  app.use(mount('/build', statics(paths.dist('client'))));
}

app.use(favicon(paths.public('favicon.ico')));
app.use(statics(paths.public()));

app.use(renderClient());

export default app;
