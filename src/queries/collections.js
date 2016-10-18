import Relay from 'react-relay';

export default {
 collections: () => Relay.QL`query { collections(limit: 10) }`
}
