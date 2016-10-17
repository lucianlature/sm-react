import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { globalIdField } from 'graphql-relay';

export default (refs) => new GraphQLObjectType({
  name: 'asset',
  description: 'An asset.',
  fields: () => ({
    id: globalIdField(),
    asset_url: {
      type: GraphQLString,
      description: 'Asset url.',
      resolve: asset => asset.asset_url
    }
  }),

  interfaces: [ refs.nodeInterface ] // <-- Hooking up the nodeInterface
});
