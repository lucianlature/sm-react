import {
  GraphQLObjectType,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { resolver } from 'graphql-sequelize';

import assetType from './asset';
import { sequelize } from '../models';

export default (refs) => new GraphQLObjectType({
  name: 'CollectionAsset',
  description: 'A collection asset.',
  fields: () => ({
    id: globalIdField(),
    asset: {
      type: refs.asset,
      resolve: resolver(sequelize.import(__dirname + '/../models/Asset'))
    }
  }),
  interfaces: [ refs.nodeInterface ] // <-- Hooking up the nodeInterface
});
