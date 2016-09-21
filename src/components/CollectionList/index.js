/**
 * Created by Lucian on 16/09/2016.
 */

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'collections',
    getComponents (location, cb) {
      require.ensure([
        './containers/CollectionList',
        './reducer'
      ], (require) => {
        let CollectionPage = require('./containers/CollectionList').default;
        let collectionReducer = require('./reducer').default;
        injectAsyncReducer(store, 'collections', collectionReducer);
        cb(null, CollectionPage);
      })
    }
  }
}
