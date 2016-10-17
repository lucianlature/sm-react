/**
 * Created by Lucian on 16/09/2016.
 */

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import Relay from 'react-relay';
import Layout from '../containers/Layout';
// import Home from './Home';
/*
export default class extends Relay.Route {
  static queries = {
    collections: () => Relay.QL`query { collections }`
  };
  static routeName = 'rootRoute';
}
*/
export default function createRoutes (store) {
  const root = {
    path: '/',
    component: Layout,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [/*
          require('../components/CollectionList').default(store), // no need to modify store, no reducer
          require('../components/Collection').default(store), // add async reducer
          require('../components/NotFoundPage').default
        */])
      })
    }/*,

    indexRoute: {
      component: Home
    }*/
  };

  return root;
}
