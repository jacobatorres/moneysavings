import React from 'react';

import './SideDrawer.css';

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

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';

  if (props.show) {
    drawerClasses = 'side-drawer open';
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <button onClick={clearData}>Clear Data</button>
        </li>
      </ul>
    </nav>
  );
};

export default sideDrawer;
