import React from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar_nav">
      <div className="toolbar-togglebutton">
        <DrawerToggleButton click={props.changesidedrawerstate} />
      </div>
      <div className="toolbar_logo">
        <a href="/">LOGO</a>
      </div>
      <div className="space-right"></div>
      <div className="toolbar_navitems">
        <ul>
          <li>
            <a href="/">Login</a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
          <li>
            <a href="/">Logmiddle</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default toolbar;
// there are links, you can put in router links there
