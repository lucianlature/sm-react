// @flow

import { StyleSheetServer } from 'aphrodite';

// React deps
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helm from 'react-helmet'; // because we are already using helmet

// Relay deps
import Relay from 'react-relay';
// import IsomorphicRouter from 'isomorphic-relay-router';
import IsomorphicRelay from 'isomorphic-relay';
import rootContainerProps from './rootContainerProps';

// React Router deps
// import createMemoryHistory from 'react-router/lib/createMemoryHistory';
// import RouterContext from 'react-router/lib/RouterContext';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { Provider } from 'react-redux';
// import { trigger } from 'redial';
import { ServerRouter, createServerRenderContext } from 'react-router';

// import { getRoutingContext, RouterResult } from './getRoutingContext';

// Our deps
import readJSON from './readJSON';
import Layout from '../../containers/Layout';
import config from '../../../config';
import routes from '../../routes';
// import configureStore from '../../store';

const { paths, globals: { __DEV__, __PROD__ }, host, graphQLPort } = config;

const GRAPHQL_URL = `http://${host}:${graphQLPort}/graphql`;
const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL);

// let routes: ?{};
let configureStore: ?Function;

/*
if (__PROD__) {
  const serverApp:String = paths.dist('server');
  ( { configureStore } = require(serverApp) );
}
*/

export default function renderClient(): Function {
  return async function renderClientMiddleware (ctx, next) {
    const { data, props } = await IsomorphicRelay.prepareData(rootContainerProps, networkLayer);
    const preloadedData = JSON.stringify(data).replace(/\//g, '\\/');
    // first create a context for <ServerRouter>, it's where we keep the
    // results of rendering for the second pass if necessary
    const context = createServerRenderContext();

    // render the first time
    let markup = renderToString(
      <ServerRouter
        location={ ctx.req.url }
        context={ context }>
        <IsomorphicRelay.Renderer {...props} />
      </ServerRouter>
    );

    /*
    // get the result
    const result = context.getResult();

    // the result will tell you if it redirected, if so, we ignore
    // the markup and send a proper redirect.
    if (result.redirect) {
      ctx.status = 301;
    } else {
      // the result will tell you if there were any misses, if so
      // we can send a 404 and then do a second render pass with
      // the context to clue the <Miss> components into rendering
      // this time (on the client they know from componentDidMount)
      if (result.missed) {
        ctx.status = 404;
        markup = renderToString(
          <ServerRouter
            location={ctx.req.url}
            context={context}>
            <div>Iaca lipsa!</div>
          </ServerRouter>
        )
      }
      */
      ctx.status = 200;
      ctx.body = `
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Isomorphic Relay • Site Manager</title>
        </head>
        <body>
        <div id="root">${ markup }</div>
        <script id="preloadedData" type="application/json">${ preloadedData }</script>
        </body>
        </html>
      `;
    // }

    await next();
  }
}
