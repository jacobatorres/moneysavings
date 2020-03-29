import React, { Component } from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

import Backdrop from '../Backdrop/Backdrop';

import Modal from '../Modal/modal';

import axios from 'axios';

class toolbar extends Component {
  state = {
    clearedData: false
  };

  clearData = event => {
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
        this.setState({ clearedData: true });

        // get the running total for bill, food, transportation, leisure
      })
      .catch(error => {
        console.log('nagkamali sa delete toolbar clear');
        console.log(error.response);
        this.setState({ clearedData: true });
      });
  };

  unshowBackdrop = event => {
    this.setState({ clearedData: false });
    // window.location.reload(false);
  };

  render() {
    let hasClearedData = null;

    if (this.state.clearedData) {
      hasClearedData = (
        <div>
          <Backdrop clicked={this.unshowBackdrop} showafterSD="true" />
          <Modal clicked={this.unshowBackdrop} message="Deleted Data" />
        </div>
      );
    }

    return (
      <header className="toolbar">
        <nav className="toolbar_nav">
          <div className="toolbar-togglebutton">
            <DrawerToggleButton click={this.props.changesidedrawerstate} />
          </div>
          <div className="toolbar_logo">
            <a href="/">LOGO</a>
          </div>
          <div className="space-right"></div>
          <div className="toolbar_navitems">
            <ul>
              <li>
                <button onClick={this.clearData}>Clear Data</button>
                {hasClearedData}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default toolbar;
// there are links, you can put in router links there
