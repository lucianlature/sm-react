/* @flow */
/* eslint-disable no-console */

// This grants us source map support, which combined with our webpack source
// maps will give us nice stack traces.
import 'source-map-support/register';

import path from 'path';
import appRoot from 'app-root-path';
import Koa from 'koa';
import statics from 'koa-static';
import mount from 'koa-mount';
// import type { $Request, $Response, NextFunction } from 'express';
import compress from 'koa-compress';
// import hpp from 'hpp';

import helmet from 'koa-helmet';
import universalMiddleware from './middleware/universalMiddleware';
import { notEmpty } from '../shared/universal/utils/guards';

const appRootPath = appRoot.toString();

// Create our koa2 based server.
const app = new Koa();

// Disable `X-powered-by`
app.use(helmet.hidePoweredBy());

// Don't expose any software information to hackers.
app.use(helmet());

/*
// Prevent HTTP Parameter pollution.
app.use(hpp());
*/
// Content Security Policy
app.use(helmet.contentSecurityPolicy({
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'"],
  imgSrc: ["'self'"],
  connectSrc: ["'self'", 'ws:'],
  fontSrc: ["'self'"],
  objectSrc: ["'none'"],
  mediaSrc: ["'none'"],
  frameSrc: ["'none'"],
}));
app.use(helmet.xssFilter());
app.use(helmet.frameguard('deny'));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());

// Response compression.
app.use(compress());

// Configure static serving of our webpack bundled client files.

app.use(mount(notEmpty(process.env.CLIENT_BUNDLE_HTTP_PATH), statics(path.resolve(appRootPath, notEmpty(process.env.BUNDLE_OUTPUT_PATH), './client')), {
  maxage: notEmpty(process.env.CLIENT_BUNDLE_CACHE_MAXAGE)
}));

// Configure static serving of our "public" root http path static files.
app.use(mount('/public', statics(path.resolve(appRootPath, './public'))));

// The universal middleware for our React application.
app.use(universalMiddleware);

/*
// Handle 404 errors.
// Note: the react application middleware hands 404 paths, but it is good to
// have this backup for paths not handled by the universal middleware. For
// example you may bind a /api path to express.
app.use((context, next) => { // eslint-disable-line no-unused-vars,max-len
  context.response.status = 404;
  context.response.body = 'Sorry, that resource was not found.';
});

// Handle all other errors (i.e. 500).
// Note: You must provide specify all 4 parameters on this callback function
// even if they aren't used, otherwise it won't be used.
app.use((context, next) => { // eslint-disable-line no-unused-vars,max-len
  if (err) {
    console.log(err);
    console.log(err.stack);
  }
  context.response.status = 500;
  context.ressponse.body = 'Sorry, an unexpected error occurred.';
});
*/
// Create an http listener for our express app.
const port = parseInt(notEmpty(process.env.SERVER_PORT), 10);
const listener = app.listen(port, () =>
  console.log(`🚀 Server listening on port ${port}`)
);

// We export the listener as it will be handy for our development hot reloader.
export default listener;
