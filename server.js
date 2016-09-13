'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './src/routes';
import { errorHandler } from './src/middlewares';
import NotFoundPage from './src/components/NotFoundPage';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.get('*', (req, res) => {
  match(
    {routes, location: req.url},
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: false,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  proxy: {
    "*": "http://localhost:6666"
  }
}).listen(3000, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }

  // start the server
  const port = process.env.PORT || 6666;
  const env = process.env.NODE_ENV || 'production';
  server.listen(port, err => {
    if (err) {
      return console.error(err);
    }
    console.info(`Server running on http://localhost:3000 [${env}]`);
  });
});
