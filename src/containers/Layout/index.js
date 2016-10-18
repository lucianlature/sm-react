/**
 * Created by Lucian on 11/09/2016.
 */

'use strict';

import React from 'react';
import Relay from 'react-relay';
import Helmet from 'react-helmet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DevTools from '../../containers/DevTools';
import SidebarLeft from '../../components/SidebarLeft';
import { StyleSheet, css } from 'aphrodite';

class Layout extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  render(children) {
    return (
      <div className="wrapper">
        <Helmet title='SiteManager &ndash; ReactJS' titleTemplate='%s - Site manager v2' />
        <Header />
        <SidebarLeft />
        {children}
        <Footer />
        <DevTools />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    maxWidth: 700,
    color: '#000',
    margin: '2rem auto',
    padding: '0 1rem'
  },
  title: {
    color: '#000',
    maxWidth: 300,
    fontWeight: 'bold',
    fontSize: 56
  },
  footer: {
    margin: '4rem auto',
    textAlign: 'center',
    color: '#b7b7b7'
  },
  footerLink: {
    display: 'inline-block',
    color: '#000',
    textDecoration: 'none'
  }
});

Layout.defaultProps = {};

export default Relay.createContainer(Layout, {
  fragments: {
    collections: () => Relay.QL`
      fragment on Collection {
        slug
        title
      }
    `
  }
});
