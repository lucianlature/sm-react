/**
 * Created by Lucian on 11/09/2016.
 */

'use strict';

import React from 'react';
import Helmet from 'react-helmet';
import Nav from '../../components/Nav';
import { StyleSheet, css } from 'aphrodite';

const Layout = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet title='React Production Starter' titleTemplate='%s - React Production Starter' />
    <h1 className={css(styles.title)}>React Production Starter</h1>
    <Nav />
    {children}
    <footer className={css(styles.footer)}>
      Copyright © 2016 <a className={css(styles.footerLink)} href='http://twitter.com/jaredpalmer' target='_blank'>Jared Palmer</a>
    </footer>
  </div>
);

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
export default Layout;

