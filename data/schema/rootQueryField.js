import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';
import { resolver } from 'graphql-sequelize';

import { sequelize } from '../models';

export default (refs) => new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    collections: {
      description: 'Collections',
      type: refs.collection,
      args: {
        limit: {
          type: GraphQLInt
        },
        order: {
          type: GraphQLString
        }
      },
      resolve: resolver(sequelize.import(__dirname + '/../models/Collection'))
    }
  }),
  node: refs.nodeField
});
