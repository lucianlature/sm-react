import webpack from 'webpack';
import config from '../../config';

const { paths, globals : { __PROD__, NODE_ENV } } = config;

export default {
  name: 'dll',
  target: 'web',
  devtool: __PROD__ ?
    'hidden-source-map' :
    'cheap-eval-source-map',

  output: {
    path: paths.public('dll'),
    filename: 'dll.[name].js',
    library: '[name]'
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      include: paths.src(), // important for performance!
      exclude: /(node_modules|server)/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true, // important for performance!
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ["react-hot-loader/babel", 'transform-async-to-generator', 'transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread']
      }
    },]
  },

  entry: {
    vendor: [
      'babel-polyfill',
      'whatwg-fetch',
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-helmet',
      'redux-thunk',
      'redial'
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      paths.src(),
      'node_modules'
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': NODE_ENV
    }),
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: paths.build('webpack/dlls/[name]-manifest.json'),
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]',
      context: paths.src()
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
