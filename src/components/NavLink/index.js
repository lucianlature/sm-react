/**
 * Created by Lucian on 14/09/2016.
 */

import React from 'react';
import { Link } from 'react-router';

function NavLink (props) {
  return <Link {...props} />
}

NavLink.defaultProps = {
  activeClassName: 'active'
};

export default NavLink;
