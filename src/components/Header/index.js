import React from 'react';
import { Link } from 'react-router';
import Navigation from '../Navigation';

export default () => (
  <header className="main-header">
    {/* Logo  */}
    <Link to="/" className="logo">
      {/* mini logo for sidebar mini 50x50 pixels  */}
      <span className="logo-mini"><b>SM</b></span>
      {/* logo for regular state and mobile devices  */}
      <span className="logo-lg"><b>Site</b>Manager</span>
    </Link>
    <Navigation />
  </header>
)
