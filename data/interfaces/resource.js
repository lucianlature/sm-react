import {
  GraphQLInterfaceType,
  GraphQLString
} from 'graphql';

// import { Recipe, Article } from '../models';

export const resourceInterface = new GraphQLInterfaceType({
  name: 'Resource',
  description: 'SCM Platform Resource',
  fields: () => ({
    contentType: {
      type: GraphQLString
    }
  })/*,
  resolveType: (root, {}) => {
    if (root.recipe_id) {
      return Recipe;
    } else {
      return Article;
    }
  }
  */
});
