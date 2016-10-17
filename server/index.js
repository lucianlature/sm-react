'use strict';

import path from 'path';
import throng from 'throng';
import http from 'http';
import Express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import graphqlHttp from 'express-graphql';

import React from 'react';
import { trigger } from 'redial';
import { StyleSheetServer } from 'aphrodite';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../tools/webpack.client.dev';

import { schema } from '../data/schema';
import renderOnServer from './renderOnServer';
import { compileDev, startDev } from '../tools/dx';

export const createServer = (config) => {
  const __PROD__ = config.nodeEnv === 'production';
  const __TEST__ = config.nodeEnv === 'test';
  const app = Express();
  const graphqlHttpConfig = (schema) => ({ schema, pretty: true, graphiql: true });

  let assets = null;
  app.disable('x-powered-by');

  if (__PROD__ || __TEST__) {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
    app.use(compression());
    if (__PROD__) {
      assets = require('../assets.json');
    }
  } else {
    app.use('/graphql', graphqlHttp(graphqlHttpConfig(schema)));
    app.use(morgan('dev'));
    const compiler = compileDev((webpack(webpackConfig)), config.port);
    app.use(webpackDevMiddleware(compiler, {
      publicPath: '/',
      profile: true,
      stats: {
        colors: true,
        hash: true,
        version: true,
        timings: true,
        assets: true,
        chunks: true
      },
      watchOptions: {
        ignored: /node_modules/
      }
    }));
    app.use(webpackHotMiddleware(compiler, { log: console.log }));
  }

  app.use(Express.static(path.join(__dirname, '..', 'src', 'static')));
  // app.use('/api/v0/collections', require('./api/collections'));

  app.get('*', (req, res) => {
    renderOnServer(req, res, next);
  });

  return http.createServer(app);
};

export const startServer = (serverConfig) => {
  const config =  { ...DefaultServerConfig, ...serverConfig };
  const server = createServer(config);
  server.listen(config.port, (err) => {
    if (config.nodeEnv === 'production' || config.nodeEnv === 'test') {
      if (err) console.log(err);
      console.log(`server ${config.id} listening on port ${config.port}`)
    } else {
      startDev(config.port, err)
    }
  });
};

if (require.main === module) {
  throng({
    start: (id) => startServer({ id }),
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity
  });
}
