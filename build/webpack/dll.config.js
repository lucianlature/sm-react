import webpack from 'webpack';
import config from '../../config';

const { paths, globals : { __PROD__, NODE_ENV } } = config;

module.exports = {
  devtool: __PROD__ ? null : 'inline-source-map',

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
    /*
    vendor: [
      'babel-polyfill',
      'babel-runtime/core-js/array/from',
      'babel-runtime/core-js/get-iterator',
      'babel-runtime/core-js/is-iterable',
      'babel-runtime/core-js/json/stringify',
      'babel-runtime/core-js/number/is-integer',
      'babel-runtime/core-js/number/is-safe-integer',
      'babel-runtime/core-js/object/assign',
      'babel-runtime/core-js/object/create',
      'babel-runtime/core-js/object/define-property',
      'babel-runtime/core-js/object/get-own-property-descriptor',
      'babel-runtime/core-js/object/get-own-property-names',
      'babel-runtime/core-js/object/get-prototype-of',
      'babel-runtime/core-js/object/keys',
      'babel-runtime/core-js/object/set-prototype-of',
      'babel-runtime/core-js/promise',
      'babel-runtime/core-js/symbol',
      'babel-runtime/core-js/symbol/iterator',
      'babel-runtime/helpers/class-call-check',
      'babel-runtime/helpers/classCallCheck',
      'babel-runtime/helpers/create-class',
      'babel-runtime/helpers/createClass',
      'babel-runtime/helpers/defineProperty',
      'babel-runtime/helpers/extends',
      'babel-runtime/helpers/get',
      'babel-runtime/helpers/inherits',
      'babel-runtime/helpers/interop-require-default',
      'babel-runtime/helpers/interopRequireDefault',
      'babel-runtime/helpers/object-without-properties',
      'babel-runtime/helpers/objectWithoutProperties',
      'babel-runtime/helpers/possibleConstructorReturn',
      'babel-runtime/helpers/slicedToArray',
      'babel-runtime/helpers/to-consumable-array',
      'babel-runtime/helpers/toConsumableArray',
      'babel-runtime/helpers/typeof',

      // </babel-runtime>

      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-router-redux',
      'react-helmet',
      'redux-thunk',
      'redial'
    ]
    */
    vendor: [ 'babel-polyfill', 'whatwg-fetch', 'react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux' ]
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
