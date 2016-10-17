// @flow

import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import Helm from 'react-helmet'; // because we are already using helmet
import Relay from 'react-relay'
import IsomorphicRelay from 'isomorphic-relay';
import rootContainerProps from './rootContainerProps';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { getRoutingContext, RouterResult } from './getRoutingContext';
import readJSON from './readJSON';


import config from '../../../config';
// import { configureStore } from '../../store';
// import createRoutes from '../../routes/root';

const { paths, globals: { __DEV__, __PROD__ }, host, graphQLPort } = config;

const GRAPHQL_URL = `http://${host}:${graphQLPort}/graphql`;
const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL);

let routes: ?{};
let configureStore: ?Function;

if (__PROD__) {
  const serverApp:String = paths.dist('server');
  ({routes, configureStore} = require(serverApp));
}

export default function renderClient(): Function {
  return async function renderClientMiddleware({ req, res, next }) {

    /*
    IsomorphicRelay.prepareData(rootContainerProps, networkLayer).then(({data, props}) => {

      console.info('data=', data);

      const reactOutput = ReactDOM.renderToString(
        <IsomorphicRelay.Renderer {...props} />
      );
      res.status(200).send(reactOutput);
    */

    if (__DEV__) {
      Object.keys(require.cache).forEach(key => {
        delete require.cache[key];
      });

      try {
        ({ routes, configureStore } = require(paths.dist('server')));
      } catch (ex) {
        routes = null;
        configureStore = null;
        throw ex;
      }
    }

    console.info(routes);

    /*
    const location = createMemoryHistory().createLocation(req.url);
    // const result = await getRoutingContext(routes, location);


    if (!(routes && configureStore)) {
      throw new Error(
        'App has not compiled yet. Either {routes} ' +
        'or {configureStore} is unavailable.'
      );
    }

    if (result && result.errorType) {
      switch (result.errorType) {
        case RouterResult.REDIRECT:
          this.redirect(
            301,
            result.redirectLocation.pathname + result.redirectLocation.search
          );
          break;
        case RouterResult.ERROR:
          this.status = 500;
          this.body = result.error.message;
          break;
        case RouterResult.NOT_FOUND:
        default:
          this.status = 404;
          this.body = 'Not Found';
          break;
      }
    } else {
      if (result) {
        const stats = await readJSON(paths.dist('webpack-stats.json'));
        const store = configureStore();
        const markup = ReactDOM(
          <Provider store={store}>
            <RoutingContext {...result} />
          </Provider>
        );

        const state = JSON.stringify(store.getState());

        res.status(200).send({ ...stats, markup, state });
      }
    }
    */
  }
}
