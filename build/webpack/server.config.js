import webpack from 'webpack';
import fs from 'fs';
import base, { cssIdentName } from './base';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../../config';

const { paths, globals } = config;

export default {
  ...base,
  name: 'server',
  target: 'node',
  externals: fs.readdirSync('node_modules').filter(x => x !== '.bin'),
  entry: paths.src('entryPoints/server'),
  output: {
    filename: 'index.js',
    path: paths.dist('server'),
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      ...base.module.loaders.filter(loaderConfig => {
        if (/\js/.test(loaderConfig.test)) {
          return true;
        }
        return false;
      }),
      {
        test: /\.scss$/i,
        loader: ExtractTextPlugin.extract(['css', 'postcss', 'resolve-url', 'sass?sourceMap']),
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ...globals,
      __CLIENT__: false,
      __SERVER__: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
