import webpack from 'webpack';
import base from './base';
import config from '../../config';

const {
  webpackHmrPath,
  paths,
} = config;

export default {
  ...base,
  name: 'client',
  target: 'web',
  devtool: 'eval',
  entry: {
    ...base.entry,
    app: [
      `webpack-hot-middleware/client?reload=true&path=${webpackHmrPath}`,
      ...base.entry.app,
    ],
  },
  plugins: [
    // Development plugins
    // * ------------------------------------- *
    // Swap out code without *always* needing a full page reload.
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    /*,
    new webpack.DllReferencePlugin({
      context: paths.src(),
      manifest: require( paths.build('webpack/dlls/vendor-manifest.json') )
    }),
    */
    ...base.plugins
  ]
}
