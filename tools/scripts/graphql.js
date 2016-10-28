/**
 * Created by Lucian on 12/10/2016.
 */

import config from '../config';
import graphQLServer from '../data';
import { connect } from '../data/sequelize';

const {
  host,
  graphQLPort
} = config;

connect().then(() => {
  console.log(`Sequelize models are syncronised.`);
  graphQLServer.listen(graphQLPort, () => {
    console.log(`GraphQL is running at http://${host}:${graphQLPort}`);
  });
});
