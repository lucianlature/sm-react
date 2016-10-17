import {
  GraphQLInt
} from 'graphql';
import { relay } from 'graphql-sequelize';
import { sequelize } from '../models';

const { sequelizeConnection } = relay;

export default (refs) => sequelizeConnection({
  name: 'collectionItemConnection',
  nodeType: refs.item,
  target: sequelize.import(__dirname + '/../models/CollectionItem'),
  connectionFields: () => ({
    recipesCount: {
      type: GraphQLInt,
      resolve: ({ source }) => {
        // 1 is for recipe type
        return source.getColl_items().then(items => items.filter( item => item.collection_item_type_id === 1).length )
      }
    },
    articlesCount: {
      type: GraphQLInt,
      resolve: ({ source }) => {
        // 2 is for article type
        return source.getColl_items().then(items => items.filter( item => item.collection_item_type_id === 2).length )
      }
    }
  })
});
