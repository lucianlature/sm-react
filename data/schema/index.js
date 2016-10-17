import 'isomorphic-fetch';
import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';
import { relay } from 'graphql-sequelize';

import { sequelize } from '../models';
import * as types from '../types';
import * as connections from '../connections';
import rootQuery from './rootQueryField';

const { sequelizeNodeInterface } = relay;
const {
  nodeInterface,
  nodeField
} = sequelizeNodeInterface(sequelize);

const refCreators = {
  rootQuery,
  ...types,
  ...connections
};

const refs = Object.keys(refCreators).reduce((acc, key) => {
  let ref: ?{};

  if (typeof refCreators[key] === 'function') {
    ref = refCreators[key](acc);
  }

  if (ref instanceof GraphQLObjectType) {
    acc[key] = ref;
    return acc;
  }

  if (!ref) {
    return acc;
  }

  const { type, edgeType, connectionType, connectionArgs, resolve } = ref;

  if (type) {
    acc[key] = type;
  }

  if (edgeType) {
    acc[key + 'Edge'] = edgeType;
  }

  if (connectionType) {
    acc[key + 'Connection'] = connectionType;
  }

  if (connectionArgs) {
    acc[key + 'Args'] = connectionArgs;
  }

  if (resolve) {
    acc[key + 'Resolve'] = resolve;
  }

  return acc;
}, { nodeInterface, nodeField });

export default new GraphQLSchema({
  query: refs.rootQuery
});
