/**
 * Created by Lucian on 16/09/2016.
 */

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

/*
import Layout from '../containers/Layout';
import collectionsQueries from '../queries/collections';
import Home from './Home';

export default [
  {
    path: '/',
    component: Layout,
    queries: collectionsQueries,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('../components/CollectionList').default, // no need to modify store, no reducer
          require('../components/Collection').default, // add async reducer
          require('../components/NotFoundPage').default
        ])
      })
    },

    indexRoute: {
      component: Home
    }
  }
]
*/

import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    collections: () => Relay.QL`query { collections(limit: 10) }`
  };
  static routeName = 'RootRoute';
}
