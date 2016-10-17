import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { globalIdField } from 'graphql-relay';

export default (refs) => new GraphQLObjectType({
  name: 'CollectionStatus',
  description: 'A collection status.',
  fields: () => ({
    id: globalIdField(),
    name: {
      type: GraphQLString,
      description: 'Status name.',
      resolve: status => status.name
    }
  }),
  interfaces: [ refs.nodeInterface ] // <-- Hooking up the nodeInterface
});
