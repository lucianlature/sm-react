/**
 * Created by Lucian on 11/09/2016.
 */

'use strict';

import React from 'react';
import Relay from 'react-relay';
import Helmet from 'react-helmet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// import { DebugPanel, DevTools, LogMonitor } from 'redux-devtools/lib/react';
import SidebarLeft from '../../components/SidebarLeft';
import { StyleSheet, css } from 'aphrodite';

class Layout extends React.Component {

  render() {
    const { collections } = this.props;
    console.info(collections);
    return (
      <div className="wrapper">
        <Helmet title='SiteManager &ndash; ReactJS' titleTemplate='%s - Site manager v2' />
        <ol>
            <li>
              <h1>{collections.title} ({collections.slug})</h1>
            </li>
        </ol>
      </div>
    );
  }
}

export default Relay.createContainer(Layout, {
  fragments: {
    collections: () => Relay.QL`
      fragment on Collection @relay(plural: true) {
        slug
        title
      }
    `
  }
});
