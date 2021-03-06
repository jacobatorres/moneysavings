import React from 'react';

import './DrawerToggleButton.css';

const drawerToggleButton = props => (
  <button className="togglebutton" onClick={props.click}>
    <div className="togglebutton-line"></div>
    <div className="togglebutton-line"></div>
    <div className="togglebutton-line"></div>
  </button>
);

export default drawerToggleButton;
