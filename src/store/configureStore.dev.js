/**
 * Created by Lucian on 13/09/2016.
 */

/* eslint-disable react/jsx-first-prop-new-line */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
/* eslint-enable global-require, react/jsx-first-prop-new-line */
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';

const reduxRouterMiddleware = routerMiddleware(browserHistory);
const middleware = [
  reduxRouterMiddleware,
  thunk
].filter(Boolean);

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&#]+)\b/
      )
    ),
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      const nextReducer = require('../reducers').default;
      /* eslint-enable global-require */
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default configureStore;
