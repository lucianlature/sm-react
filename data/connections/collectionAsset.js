import { relay } from 'graphql-sequelize';
import { sequelize } from '../models';

const { sequelizeConnection } = relay;

export default (refs) => sequelizeConnection({
  name: 'collectionAssetConnection',
  nodeType: refs.collectionAsset,
  target: sequelize.import(__dirname + '/../models/CollectionAsset')
});
