// @flow

import { StyleSheetServer } from 'aphrodite';

// React deps
import React from 'react';
import ReactDOM from 'react-dom/server';
import Helm from 'react-helmet'; // because we are already using helmet

// Relay deps
import Relay from 'react-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
// import IsomorphicRelay from 'isomorphic-relay';
// import rootContainerProps from './rootContainerProps';

// React Router deps
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import RouterContext from 'react-router/lib/RouterContext';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { trigger } from 'redial';
import { match } from 'react-router';

// import { getRoutingContext, RouterResult } from './getRoutingContext';

// Our deps
import readJSON from './readJSON';
import Html from '../../containers/Html';
import config from '../../../config';
import routes from '../../routes';
import configureStore from '../../store';

const { paths, globals: { __DEV__, __PROD__ }, host, graphQLPort } = config;

const GRAPHQL_URL = `http://${host}:${graphQLPort}/graphql`;
const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL);
/*
let routes: ?{};
let configureStore: ?Function;

if (__PROD__) {
  const serverApp:String = paths.dist('server');
  ({routes, configureStore} = require(serverApp));
}
*/
export default function renderClient(): Function {
  return async function renderClientMiddleware (ctx, next) {
    /*
    const store = configureStore({
      sourceRequest: {
        protocol: req.headers['x-forwarded-proto'] || req.protocol,
        host: req.headers.host
      }
    });
    const routes = createRoutes(store);
    const history = createMemoryHistory(request.originalUrl);
    const { dispatch } = store;


    match({ routes, history}, async (err, redirectLocation, renderProps) => {
      if (err) {
        console.error(err);
        return response.status(500).send('Internal server error');
      }

      if (!renderProps) {
        return res.status(404).send('Not found');
      }
      const { components } = renderProps;

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch
      };

      await trigger('fetch', components, locals);

      const initialState = store.getState();
      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      // just call html = ReactDOM.renderToString(InitialView)
      // to if you don't want Aphrodite. Also change renderFullPage
      // accordingly
      const data = StyleSheetServer.renderStatic(
        () => ReactDOM.renderToString(InitialView)
      );
      const head = Helm.rewind();

      const stats = await readJSON(paths.dist('webpack-stats.json'));
      ctx.body = 'Cocushele mele!';

          ctx.body = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charSet="utf-8">
                <meta httpEquiv="X-UA-Compatible" content="IE=edge">
                ${head.title.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="shortcut icon" href="/favicon.ico">
                ${head.meta.toString()}
                ${head.link.toString()}
                <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
                <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
                <!--[if lt IE 9]>
                <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
                <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
                <![endif]-->
                <style>
                  html {
                    box-sizing: border-box
                  }

                  *,
                  *::before,
                  *::after {
                    box-sizing: border-box
                  }

                  html {
                    font-size: 100%;
                    -ms-overflow-style: scrollbar;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    height: 100%;
                  }

                  body {
                    font-size: 1rem;
                    background-color: #fff;
                    color: #555;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif;
                  }

                  h1,h2,h3,h4,h5,h6 {
                    margin: 0;
                    padding: 0;
                  }

                  .bs-glyphicons {
                    padding-left: 0;
                    padding-bottom: 1px;
                    margin-bottom: 20px;
                    list-style: none;
                    overflow: hidden;
                  }

                  .bs-glyphicons li {
                    float: left;
                    width: 25%;
                    height: 115px;
                    padding: 10px;
                    margin: 0 -1px -1px 0;
                    font-size: 12px;
                    line-height: 1.4;
                    text-align: center;
                    border: 1px solid #ddd;
                  }

                  .bs-glyphicons .glyphicon {
                    margin-top: 5px;
                    margin-bottom: 10px;
                    font-size: 24px;
                  }

                  .bs-glyphicons .glyphicon-class {
                    display: block;
                    text-align: center;
                    word-wrap: break-word; /* Help out IE10+ with class names *
                  }

                  .bs-glyphicons li:hover {
                    background-color: rgba(86, 61, 124, .1);
                  }

                  @media (min-width: 768px) {
                    .bs-glyphicons li {
                      width: 12.5%;
                    }
                  }
                </style>
                <style data-aphrodite>${data.css.content}</style>
              </head>
              <body class="hold-transition skin-blue sidebar-mini">
                <div id="root">${data.html}</div>

                <!--<link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Lato:400,700,400italic,300,100,300italic,100italic,700italic' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900&subset=latin,greek,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic' rel='stylesheet' type='text/css'>-->

                <script>window.renderedClassNames = ${JSON.stringify(data.css.renderedClassNames)};</script>
                <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
                <script>__REACT_DEVTOOLS_GLOBAL_HOOK__ = parent.__REACT_DEVTOOLS_GLOBAL_HOOK__</script>
                <script src="/build/dll.vendor.js"></script>
                <script async src="/build/${stats.js[1]}"></script>
              </body>
            </html>
          `;
    });
    */

    async function render(reactOutput, preloadedData, head, stats) {
      return `
            <!DOCTYPE>
            <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    ${ head.title.toString() }
                    ${ head.meta.toString() }
                    ${ head.link.toString() }
                    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
                    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
                    <!--[if lt IE 9]>
                    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
                    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
                    <![endif]-->
                    <style>
                      html {
                        box-sizing: border-box
                      }
    
                      *,
                      *::before,
                      *::after {
                        box-sizing: border-box
                      }
    
                      html {
                        font-size: 100%;
                        -ms-overflow-style: scrollbar;
                        -webkit-tap-highlight-color: rgba(0,0,0,0);
                        height: 100%;
                      }
    
                      body {
                        font-size: 1rem;
                        background-color: #fff;
                        color: #555;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif;
                      }
    
                      h1,h2,h3,h4,h5,h6 {
                        margin: 0;
                        padding: 0;
                      }
    
                      .bs-glyphicons {
                        padding-left: 0;
                        padding-bottom: 1px;
                        margin-bottom: 20px;
                        list-style: none;
                        overflow: hidden;
                      }
    
                      .bs-glyphicons li {
                        float: left;
                        width: 25%;
                        height: 115px;
                        padding: 10px;
                        margin: 0 -1px -1px 0;
                        font-size: 12px;
                        line-height: 1.4;
                        text-align: center;
                        border: 1px solid #ddd;
                      }
    
                      .bs-glyphicons .glyphicon {
                        margin-top: 5px;
                        margin-bottom: 10px;
                        font-size: 24px;
                      }
    
                      .bs-glyphicons .glyphicon-class {
                        display: block;
                        text-align: center;
                        word-wrap: break-word; /* Help out IE10+ with class names *
                      }
    
                      .bs-glyphicons li:hover {
                        background-color: rgba(86, 61, 124, .1);
                      }
    
                      @media (min-width: 768px) {
                        .bs-glyphicons li {
                          width: 12.5%;
                        }
                      }
                    </style>
                </head>
                <body class="hold-transition skin-blue sidebar-mini">
                    <div id="root">${reactOutput}</div>
                    <script id="preloaded-data" type="application/json">${preloadedData}</script>
                    <script src="/dll/dll.vendor.js"></script>
                    <script async src="/build/${stats.js[0]}"></script>
                </body>
            </html>
        `;
    }

    /*
    const memoryHistory = createMemoryHistory(ctx.req.originalUrl);
    const location = memoryHistory.createLocation(ctx.req.originalUrl);
    const store = configureStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);
    */

    const { redirectLocation, renderProps } = await new Promise((resolve, reject) => {
      match({
        // history,
        routes,
        location: ctx.req.url
      }, (err, redirectLocation, renderProps) => {
        if (err) {
          ctx.throw(`Error matching the route with current location: ${ctx.req.url}`);
          return reject(err);
        }
        return resolve({ redirectLocation, renderProps });
      });
    });

    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const stats = await readJSON(paths.dist('webpack-stats.json'));
      const { data, props } = await IsomorphicRouter.prepareData(renderProps, networkLayer);

      const preloadedData = JSON.stringify(data);
      const component = IsomorphicRouter.render(props);

      const reactOutput = ReactDOM.renderToString(
        <Html
          assets={ stats }
          preloadedData = { preloadedData }
          component={ component }
        />
      );
      const head = Helm.rewind();

      /*
      const component = (
        <Provider store={ store } key="provider">
          <RouterContext { ...renderProps } />
        </Provider>
      );

      const reactOutput = ReactDOM.renderToString(
        <Html assets={ webpackIsomorphicTools.assets() } component={ component } store={ store } />
      );
      */

      ctx.status = 200;
      // ctx.body = await render(reactOutput, preloadedData, head, stats);
      ctx.body = '<!doctype html>\n' + reactOutput;
    }

    await next();
  }
}
