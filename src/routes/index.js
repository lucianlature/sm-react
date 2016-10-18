/**
 * Created by Lucian on 16/09/2016.
 */

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

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
          require('../components/CollectionList').default(store), // no need to modify store, no reducer
          require('../components/Collection').default(store), // add async reducer
          require('../components/NotFoundPage').default
        ])
      })
    },

    indexRoute: {
      component: Home
    }
  }
]
