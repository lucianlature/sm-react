/**
 * Created by Lucian on 12/10/2016.
 */

import path, { resolve } from 'path';
import { argv } from 'yargs';

/**********************************************************************
 * Path Declarations
 * ---------------------------------
 * Modify where different portions of your application are stored.
 **********************************************************************/

export const BASE_PATH = path.resolve(__dirname, '../');
export const SRC = 'src';
export const BIN = 'bin';
export const BUILD = 'build';
export const DATA = 'data';
export const DIST = 'dist';
export const PUBLIC = 'public';

/**********************************************************************
 * Environmental Variables
 * ---------------------------------
 * Get runtime variables passed through the environment and export
 * them as configuration declarations.
 **********************************************************************/

export const {
  NODE_ENV: env = 'development',
  HOST: host = 'localhost',
  PORT: port = 5000,
  GRAPHQL_PORT: graphQLPort = 5050,
  WEBPACK_PORT: webpackPort = 5001,
  WEB_CONCURRENCY: webConcurrency = 1,
  TIMEOUT: timeout = 29000,
  API_ROOT: api_root = 'http://qa3-sitemanager.constant.co',
  COOKIE_NAME: cookie_name = 'scm-site-manager-security-token-qa3',
  TOKEN: token = 'oUiIFpaMSqnI%2BBqTVI9VLrj6LrEh%2Bg%2FLGbSNKSQ3sVl1qTtw6RyuFsDgmUsAVpErAaEXBn6oa32VVCfv4ckTrshVUaeKvhh5%2B5osMELBn8oYLhcLOrAaQmjA4w8DlqNOlat1W81VdjxgWfyUF8Tn0KevkoBv3n5bELKJLCBbJsbOKp92GylK1D%2Ba1FCvalMFrimgqquyVjrvpC1ojbtpz7KFpIZqorN%2B8Ac70cV9ecB7hAZQ4BAApvAKd7rxJboy4ICNEpypG0c4toJ4aG43iC4du9Xz%2BvW3EglmGlOKGo3KhQXSLBUvdFsyAfAgkEIrLBLYJryhzl%2Fm0gbyCcL%2F0g%3D%3D'
} = process.env;

/**********************************************************************
 * Globals
 * ---------------------------------
 * Declare global variables for use in webpack bundles.
 **********************************************************************/

export const globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(env),
  },
  'NODE_ENV': env,
  '__DEV__': env === 'development',
  '__PROD__': env === 'production',
  '__DEBUG__': env === 'development' && !argv.no_debug,
  '__DEBUG_NW__': !!argv.nw,
};

/**********************************************************************
 * Webpack Public Paths
 * ---------------------------------
 * The path for the client and hot module replacement extensions.
 **********************************************************************/

export const webpackPublicPath = `http://${host}:${webpackPort}/`;
export const webpackHmrPath = `http://${host}:${webpackPort}/__webpack_hmr`;

/**********************************************************************
 * Path Helper
 * ---------------------------------
 * Declare a helper for quickly generating paths to key folders
 * of the application.
 **********************************************************************/

export const paths = (() => {
  const base = (...args) => resolve.apply(resolve, [BASE_PATH, ...args]);

  return {
    base,
    src: base.bind(null, SRC),
    bin: base.bind(null, BIN),
    build: base.bind(null, BUILD),
    data: base.bind(null, DATA),
    dist: base.bind(null, DIST),
    public: base.bind(null, PUBLIC)
  };
})();

/**********************************************************************
 * Webpack Aliases
 * ---------------------------------
 * Allow for the importing of modules through wepback by way of
 * shortened absolute paths rather than relative paths.
 **********************************************************************/

const appAliases = [
  'actions',
  'components',
  // 'constants',
  'containers',
  'entryPoints',
  'reducers',
  'routes',
  // 'store',
  'styles',
  'utils',
  // 'views',
].reduce((acc, key) => ((acc[key] = paths.src(key)) && acc), {});


const rootAliases = [
  'build',
  'bin',
  'config',
  'data',
].reduce((acc, key) => ((acc[key] = paths.base(key)) && acc), {});

export const aliases = {
  ...appAliases,
  ...rootAliases,
};
