/**
 * Created by Lucian on 17/09/2016.
 */

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'collection/:id',
    getComponents (location, cb) {
      require.ensure([
        './containers/CollectionPage',
        './reducer'
      ], (require) => {
        let CollectionPage = require('./containers/CollectionPage').default;
        let collectionReducer = require('./reducer').default;
        injectAsyncReducer(store, 'currentCollection', collectionReducer);
        cb(null, CollectionPage);
      })
    }
  }
}
