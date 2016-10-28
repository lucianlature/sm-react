/**
 * Created by Lucian on 12/10/2016.
 */

// import config from '../config';
import envVars from '../config/envVars';
import ListenerManager from './listenerManager';
import { createNotification } from '../utils';
import graphQLServer from '../../data';
import { connect } from '../../data/sequelize';
/*
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
*/

export default class GraphQLServer {
  constructor(options) {
    this.listenerManager = null;

    connect().then(() => {
      createNotification({
        title: 'connect',
        level: 'info',
        message: 'Sequelize models syncronised.',
      }); 
    }).then(() => {
        graphQLServer.listen(envVars.GRAPHQL_PORT, () => {
            // The server bundle will automatically start the web server just by
            // requiring it. It returns the http listener too.
            this.listenerManager = new ListenerManager(graphQLServer, 'graphserver');
            const url = `http://localhost:${envVars.GRAPHQL_PORT}`;

            createNotification({
                title: 'graphserver',
                level: 'info',
                message: `GraphQL running on ${url}.`,
                open: url,
            });
        });
    }).catch(err => {
        createNotification({
            title: 'graphserver',
            level: 'error',
            message: `Failed to start GraphQL, please check the error for more information: ${err}`,
        });    
    });

    // Now we will configure `chokidar` to watch our server specific source folder.
    // Any changes will cause a rebuild of the server bundle.
    /*
    const compileHotServer = () => {
      // Shut down any existing running listener if necessary before starting the
      // compile, else just compile.
      if (this.listenerManager) {
        this.listenerManager.dispose(true).then(runCompiler);
      } else {
        runCompiler();
      }
    };

    this.watcher = chokidar.watch([path.resolve(__dirname, '../../src/server')]);
    this.watcher.on('ready', () => {
      this.watcher
        .on('add', compileHotServer)
        .on('addDir', compileHotServer)
        .on('change', compileHotServer)
        .on('unlink', compileHotServer)
        .on('unlinkDir', compileHotServer);
    });

    // Lets start the compile.
    runCompiler();
    */
  }

  dispose() {
    return this.listenerManager
      ? this.listenerManager.dispose()
      : Promise.resolve();
  }
}
