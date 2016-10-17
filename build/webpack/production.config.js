import webpack from 'webpack';
import precss from 'precss';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import base from './base';
import config from '../../config';

const { paths } = config;

export default {
  ...base,
  name: 'client',
  target: 'web',
  module: {
    ...base.module,/*
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint',
      },
    ],*/
    loaders: base.module.loaders.map(loaderConfig => {
      if (/css/.test(loaderConfig.test)) {
        const [first, ...rest] = loaderConfig.loaders;

        loaderConfig.loader = ExtractTextPlugin.extract({
          fallbackLoader: first,
          loader: rest.join('!')
        });
        delete loaderConfig.loaders;
      }

      if (/js|jsx/.test(loaderConfig.test)) {
        loaderConfig.exclude = /node_modules/;
      }

      return loaderConfig;
    }),
  },
  plugins: [
    ...base.plugins,
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: false,
      allChunks: true
    }),
  ]/*,
  eslint: {
    configFile: paths.base('.eslintrc'),
    failOnError: true,
    emitWarning: false,
  },*/
};
