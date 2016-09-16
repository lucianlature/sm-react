const path = require('path');
const webpack = require('webpack');
const CONFIG = require('./webpack.base');

const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = CONFIG;

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
      // 'webpack-dev-server/client?http://localhost:5000',
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client',
      CLIENT_ENTRY
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'aphrodite'
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    path: CLIENT_OUTPUT
  },
  module: {
    preLoaders: [
      {
        // set up standard-loader as a preloader
        test: /\.jsx?$/,
        loader: 'standard',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|server)/,
        query: {
          cacheDirectory: true,
          presets: ["es2015", "react", "stage-0"]
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
        loaders: ['style', 'css', 'autoprefixer', 'sass']
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  standard: {
    // config options to be passed through to standard e.g.
    parser: 'babel-eslint'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      // actions: `${defaultSettings.srcPath}/actions/`,
      // components: `${defaultSettings.srcPath}/components/`,
      // sources: `${defaultSettings.srcPath}/sources/`,
      // stores: `${defaultSettings.srcPath}/stores/`,
      // styles: `${defaultSettings.srcPath}/styles/`,
      // config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
      jquery: path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.js')
    },
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js'
    }),
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
    new webpack.NoErrorsPlugin()
  ],
};
