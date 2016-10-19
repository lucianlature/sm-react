import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import config from '../config';

const { webpackPublicPath } = config;

const app = express();
// make sure the first configuration defined
// in `webpack.config.js` is for the client
// TODO: find a better way to identify the client configuration
const compiler = webpack(webpackConfig[0]);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackPublicPath,
  // options for formating the statistics
  stats: {
    colors: true
  },
  compress: true,
  hot: true,
  quiet: true,
  noInfo: true,
  lazy: false,
  historyApiFallback: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

export default app;
