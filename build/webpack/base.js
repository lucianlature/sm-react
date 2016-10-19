import webpack from 'webpack';
import precss from 'precss';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from '../../config';

import {
  ReportStatsPlugin,
  WriteStatsPlugin,
} from '../utils';

const { paths, globals, aliases, env } = config;
const { __PROD__ } = globals;

/*
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: '[name].[hash].js',
  minChunks: module => module.resource &&
  module.resource.indexOf('node_modules') !== -1,
});
commonChunkPlugin.__KARMA_IGNORE__ = true;
*/

export const cssIdentName = __PROD__ ?
  '[hash:base64:16]' :
  '[name]__[local]___[hash:base64:5]';

export default {
  devtool: __PROD__ ?
    'hidden-source-map' :
    'cheap-eval-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      paths.src('entryPoints/client')
    ]
  },
  output: {
    path: paths.dist('client'),
    publicPath: '/build/',
    filename: '[name].[hash].js',
    library: '[name]_lib'
  },
  module: {
    /*
    preLoaders: [
      {
        // set up standard-loader as a preloader
        test: /\.jsx?$/,
        loader: 'standard',
        exclude: /(node_modules)/
      }
    ],
    */
    loaders: [
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css'
        ]
      },
      { test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'resolve-url', 'sass?sourceMap']
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.src(), // important for performance!
        exclude: /(node_modules|server)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true, // important for performance!
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ["react-hot-loader/babel", 'transform-async-to-generator', 'transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread']
        }
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      ...aliases,
      jquery: paths.base('node_modules/jquery/dist/jquery.js')
    },
    modules: [
      paths.src(),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': { NODE_ENV: JSON.stringify(env) },
      'process.env.BROWSER': true
    }),

    /*
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    */

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),

    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      debug: true,
      options:  {
        postcss: function() {
          return [ precss ];
        },
        context: paths.src(),
        output: {
          path: paths.dist
        }
      }
    }),
    new ReportStatsPlugin(),
    new WriteStatsPlugin()
  ]
}
