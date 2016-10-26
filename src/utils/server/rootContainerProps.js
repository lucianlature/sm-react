/**
 * Created by Lucian on 12/10/2016.
 */

// import Relay from 'react-relay';
import Layout from '../../containers/Layout';
import rootRoute from '../../routes';

/*
export default class extends Relay.Route {
  static queries = {
    collections: () => Relay.QL`query { collections(limit: 10) }`,
  };
  static routeName = 'RootRoute';
}
*/

export default {
  Container: Layout,
  queryConfig: new rootRoute()
};
