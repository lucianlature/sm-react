/**
 * Created by Lucian on 11/09/2016.
 */

'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './containers/Layout';
import IndexPage from './components/IndexPage';
// import AthletePage from './components/AthletePage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;