/**
 * Created by Lucian on 14/09/2016.
 */

import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class Navigation extends React.Component {
  render() {
    return (
      <Navbar
        staticTop
        fluid
      >
        {/* Sidebar toggle button */}
        <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span className="sr-only">Toggle navigation</span>
        </a>
      </Navbar>

    );
  }
}

Navigation.displayName = 'Navigation';

export default Navigation;
