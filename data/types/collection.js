import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import { globalIdField } from 'graphql-relay';
import { sequelize } from '../models';

const Collection = sequelize.import(__dirname + '/../models/Collection');

export default (refs) => new GraphQLObjectType({
  name: 'Collection',
  description: 'A Collection',
  fields: () => ({
    id: globalIdField(Collection.slug),
    sm_id: {
      type: GraphQLString,
      resolve: collection => collection.id
    },
    title: {
      type: GraphQLString,
      description: 'Title of the collection.',
      resolve: collection => collection.title
    },
    slug: {
      type: GraphQLString,
      description: 'Collection unique slug.',
      resolve: collection => collection.slug
    },
    syndicated: {
      type: GraphQLBoolean,
      description: 'Collection syndicated flag.',
      resolve: collection => collection.syndicated
    },
    status: {
      type: refs.collectionStatus,
      resolve: resolver(sequelize.import(__dirname + '/../models/CollectionStatus'))
    },
    assets: {
      type: refs.collectionAssetConnectionConnection,
      args: refs.collectionAssetConnectionArgs,
      resolve: refs.collectionAssetConnectionResolve
    },
     items: {
       type: refs.collectionItemConnectionConnection,
       args: refs.collectionItemConnectionArgs,
       resolve: refs.collectionItemConnectionResolve
     }
  }),
  interfaces: [ refs.nodeInterface ]
});
