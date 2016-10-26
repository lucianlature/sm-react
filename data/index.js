// @flow

import Koa from 'koa';
import graphQLHTTP from 'koa-graphql';
import convert from 'koa-convert';
import Schema from './schema';

const graphQLServer = new Koa();

graphQLServer.use(convert(graphQLHTTP(request => ({
  schema: Schema,
  pretty: true
}))));

export default graphQLServer;
