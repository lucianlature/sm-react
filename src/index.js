'use strict';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import configureStore from './store';
import AppRoutes from './components/AppRoutes';
import DevTools from './containers/DevTools';
import './theme/initial.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <div>
      <AppContainer>
        <AppRoutes />
      </AppContainer>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/AppRoutes', () => {
    render(
      <Provider store={store}>
        <div>
          <AppContainer
            component={require('./components/AppRoutes').default}
          />
          <DevTools />
        </div>
      </Provider>,
      document.getElementById('root')
    );
  });
}
