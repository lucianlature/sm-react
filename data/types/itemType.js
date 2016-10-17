import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { globalIdField } from 'graphql-relay';

export default (refs) => new GraphQLObjectType({
  name: 'itemType',
  description: 'Type of the item.',
  fields: () => ({
    id: globalIdField(),
    name: {
      type: GraphQLString,
      description: 'Item type.',
      resolve: itemType => itemType.name
    }
  }),

  interfaces: [ refs.nodeInterface ] // <-- Hooking up the nodeInterface
});
