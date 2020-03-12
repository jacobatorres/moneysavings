import React from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

import axios from 'axios';

function clearData() {
  console.log('hello');

  let axios_url = 'https://moneysavings.herokuapp.com';
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    axios_url = 'http://localhost:3001';
  }
  console.log(axios_url);

  axios
    .delete(axios_url + '/deleteAll')
    .then(response => {
      console.log('finish na (delete');
      console.log(response);

      // get the running total for bill, food, transportation, leisure
    })
    .catch(error => {
      console.log('nagkamali sa delete');
      console.log(error.response);
    });
}

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
            <button onClick={clearData}>Clear Data</button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default toolbar;
// there are links, you can put in router links there
