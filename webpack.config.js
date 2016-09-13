const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  entry: {
    js: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.join(__dirname, 'src', 'index.js')
    ],
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  module: {
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
        loaders: ['style', 'css', 'autoprefixer', 'sass']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),/*
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),*/
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
      'process.env.BROWSER': true
    })
  ]
};
