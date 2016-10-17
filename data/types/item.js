import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { resolver } from 'graphql-sequelize';

import { sequelize } from '../models';
import { resourceInterface } from '../interfaces/resource';
import platformBackend from '../adapters/platform';
const platform = new platformBackend();

export default (refs) => new GraphQLObjectType({
  name: 'item',
  description: 'An item.',
  fields: () => ({
    id: globalIdField(),
    resource_id: {
      type: GraphQLString,
      description: 'Resource ID.',
      resolve: asset => asset.resource_id
    },
    position: {
      type: GraphQLString,
      description: 'Item position ID.',
      resolve: asset => asset.position
    },
    itemType: {
      type: refs.itemType,
      resolve: resolver(sequelize.import(__dirname + '/../models/CollectionItemType'))
    },
    resource: {
      type: resourceInterface,
      resolve: (asset, args, { backend = platform }) => {
        return platform.get(asset.resource_id).then(response => {
          if (response.success) {
            return response.data;
          }
        });
      }
    }
  }),

  interfaces: [ refs.nodeInterface ] // <-- Hooking up the nodeInterface
});
