/**
 * Created by Lucian on 12/10/2016.
 */

// import IsomorphicRelay from 'isomorphic-relay';
// import path from 'path';
import React from 'react';
// import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay';
// import rootContainerProps from './rootContainerProps';

import ReactDOM from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import Helm from 'react-helmet'; // because we are already using helmet

import { configureStore } from '../src/store';
import createRoutes from '../src/routes/root';

// const GRAPHQL_URL = `http://localhost:5000/graphql`;
// const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL);

export default (req, res, next) => {

  const store = configureStore({
    sourceRequest: {
      protocol: req.headers['x-forwarded-proto'] || req.protocol,
      host: req.headers.host
    }
  });
  const routes = createRoutes(store);
  const history = createMemoryHistory(req.originalUrl);
  const { dispatch } = store;

  match({ routes, history}, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
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

    trigger('fetch', components, locals)
      .then(() => {
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
        res.status(200).send(`
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
                    word-wrap: break-word; /* Help out IE10+ with class names */
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
                <script src="${ __PROD__ ? assets.vendor.js : '/vendor.js' }"></script>
                <script async src="${ __PROD__ ? assets.main.js : '/main.js' }"></script>
              </body>
            </html>
          `)
      }).catch(e => console.log(e))
  });

  /*
  IsomorphicRelay.prepareData(rootContainerProps, networkLayer).then(({data, props}) => {
    const reactOutput = ReactDOMServer.renderToString(
      <IsomorphicRelay.Renderer {...props} />
    );
    res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), {
      preloadedData: data,
      reactOutput
    });
  }).catch(next);
  */
}
