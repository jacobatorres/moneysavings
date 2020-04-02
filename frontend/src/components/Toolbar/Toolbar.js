import React, { Component } from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

import { Redirect } from 'react-router-dom';

import Backdrop from '../Backdrop/Backdrop';

import Modal from '../Modal/modal';

import axios from 'axios';

import { Link } from 'react-router-dom';

import Aux from '../../hoc/Auxillary';

class toolbar extends Component {
  state = {
    clearedData: false,
    redirect: false
  };

  clearData = event => {
    console.log('hello');
    console.log('pahiream');
    console.log(this.props);

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
        this.setState({ clearedData: true, redirect: true });

        // get the running total for bill, food, transportation, leisure
      })
      .catch(error => {
        console.log('nagkamali sa delete toolbar clear');
        console.log(error.response);
        this.setState({ clearedData: true });
      });
  };

  goToPlan = () => {
    return <Redirect to="/" />;
  };

  unshowBackdrop = event => {
    this.setState({ clearedData: false, redirect: true });
    // window.location.reload(false);
  };

  logout = () => {
    console.log('hello');
    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);

    axios
      .get(axios_url + '/logout')
      .then(response => {
        console.log('logout');
        console.log(response);

        // this.setState({ clearedData: true, redirect: true });
        console.log('bye logout');
      })
      .catch(error => {
        console.log('nagkamali sa delete dito sa clear data');
        console.log(error.response);
        this.setState({ clearedData: true });
      });
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
        {this.state.redirect ? this.goToPlan() : null}
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
              {this.props.isLoggedIn ? (
                <li>
                  <a onClick={this.logout} style={{ cursor: 'pointer' }}>
                    Logout
                  </a>
                </li>
              ) : (
                <Aux>
                  {' '}
                  <li>
                    {' '}
                    <Link to="/login">
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    {' '}
                    <Link to="/register">
                      <a>Register</a>
                    </Link>
                  </li>
                </Aux>
              )}{' '}
              <li>
                <a onClick={this.clearData} style={{ cursor: 'pointer' }}>
                  Clear Data
                </a>
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
