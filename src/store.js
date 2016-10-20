import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from './createReducer';

export default function configureStore (history, initialState) {
  // Redux middleware
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [ thunkMiddleware, reduxRouterMiddleware ];

  // Development enhancers
  const enhancers = [];

  if (__DEV__ && typeof window === 'object') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // Creating the store
  const store = createStore(createReducer(), initialState, compose(
    applyMiddleware(...middleware),
    ...enhancers
  ));

  store.asyncReducers = {};

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () => store.replaceReducer(require('./createReducer').default));
    }
  }

  return store;
}

export function injectAsyncReducer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
