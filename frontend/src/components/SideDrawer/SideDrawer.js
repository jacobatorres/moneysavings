import React, { Component } from 'react';

import './SideDrawer.css';

import axios from 'axios';

import Backdrop from '../Backdrop/Backdrop';

import Modal from '../Modal/modal';

import { Link } from 'react-router-dom';

class sideDrawer extends Component {
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
      })
      .catch(error => {
        console.log('nagkamali sa delete dito sa clear data');
        console.log(error.response);
        this.setState({ clearedData: true });
      });
  };

  unshowBackdrop = event => {
    this.setState({ clearedData: false });
  };

  render() {
    let drawerClasses = 'side-drawer';

    if (this.props.show) {
      drawerClasses = 'side-drawer open';
    }

    let deleteConfirm = null;

    if (this.state.clearedData) {
      deleteConfirm = (
        <div>
          <Backdrop clicked={this.unshowBackdrop} />
          <Modal clicked={this.unshowBackdrop} message="Deleted Data" />
        </div>
      );
    }
    return (
      <nav className={drawerClasses}>
        <ul>
          <li>
            <button onClick={this.clearData}>Clear Data</button>
            {deleteConfirm}
          </li>
        </ul>
      </nav>
    );
  }
}

export default sideDrawer;
