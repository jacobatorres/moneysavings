import React, { Component } from 'react';
import axios from 'axios';

import Toolbar from './components/Toolbar/Toolbar';

// import SideDrawer from './components/SideDrawer/SideDrawer';

import Backdrop from './components/Backdrop/Backdrop';
import Modal from './components/Modal/modal';

import 'react-datepicker/dist/react-datepicker.css';

import './App.css';

// import the other files
import Register from './Auth/Register';
import Login from './Auth/Login';

import Plan from './Plan/Plan';
import View from './View/View';

import DeleteConfirmation from './View/DeleteRecord';

import RecordMainPage from './Record/RecordMainPage';

import EditRecord from './Record/EditRecord';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class App extends Component {
  state = {
    bill_value: 0,
    bill_label: '',
    food_value: 0,
    food_label: '',
    tr_value: 0,
    tr_label: '',
    leisure_value: 0,
    leisure_label: '',
    startDate: new Date(),

    toggled_bill_value: false,
    toggled_food_value: false,
    toggled_tr_value: false,
    toggled_leisure_value: false,

    isSideDrawerOpen: false,
    clearedData: false,
    redirect: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { isSideDrawerOpen: !prevState.isSideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({
      isSideDrawerOpen: false,
      clearedData: false,
      redirect: true
    });
    // window.location.reload(false);
  };

  handleChange = date => {
    console.log(date);
    this.setState({
      startDate: date
    });
  };
  valuePlannedChangedBill = event => {
    this.setState({
      bill_value: event.target.value,
      toggled_bill_value: true
    });
  };

  valuePlannedChangedFood = event => {
    this.setState({
      food_value: event.target.value,
      toggled_food_value: true
    });
  };

  valuePlannedChangedTr = event => {
    this.setState({
      tr_value: event.target.value,
      toggled_tr_value: true
    });
  };

  valuePlannedChangedLeisure = event => {
    this.setState({
      leisure_value: event.target.value,
      toggled_leisure_value: true
    });
  };

  labelPlannedChangedBill = event => {
    this.setState({ bill_label: event.target.value });
  };
  labelPlannedChangedFood = event => {
    this.setState({ food_label: event.target.value });
  };
  labelPlannedChangedTr = event => {
    this.setState({ tr_label: event.target.value });
  };
  labelPlannedChangedleisure = event => {
    this.setState({ leisure_label: event.target.value });
  };

  saveRecordtoDB = event => {
    event.preventDefault();
    console.log('i made it here');

    // Send a POST request

    console.log(this.state);
    axios
      .post('http://localhost:3001/saveRecord', {
        bill_value: this.state.bill_value,
        food_value: this.state.food_value,
        tr_value: this.state.tr_value,
        leisure_value: this.state.leisure_value,

        bill_label: this.state.bill_label,
        food_label: this.state.food_label,
        tr_label: this.state.tr_label,
        leisure_label: this.state.leisure_label,
        timestamp: this.state.startDate
      })
      .then(response => {
        console.log('tumama i guess');
        console.log(response);
      })
      .catch(error => {
        console.log('nagkamali');
        console.log(error.response);
      });

    // console.log(this.state);
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3001/saveRecord',
    //   data: this.state
    // });
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

        this.setState({ clearedData: true, redirect: true });
        console.log('bye');
      })
      .catch(error => {
        console.log('nagkamali sa delete dito sa clear data');
        console.log(error.response);
        this.setState({ clearedData: true });
      });
  };

  goToPlan = () => {
    return <Redirect to="/" />;
  };

  render() {
    // let saved_val =
    //   parseFloat(this.state.planned) >= parseFloat(this.state.spent)
    //     ? true
    //     : false;

    // let result_saved = saved_val ? 'good!' : 'over the limit!';

    // let color_result = saved_val ? 'green' : 'red';

    let sideDrawer;
    let sd_and_backdrop = null;

    let drawerClasses = 'side-drawer';

    let deleteConfirm = null;

    if (this.state.clearedData) {
      console.log('plspks');
      deleteConfirm = (
        <div>
          <Backdrop clicked={this.backdropClickHandler} />
          <Modal clicked={this.backdropClickHandler} message="Deleted Data" />
        </div>
      );
    }

    if (this.state.isSideDrawerOpen) {
      drawerClasses = 'side-drawer open';

      sd_and_backdrop = (
        <div>
          <nav className={drawerClasses}>
            <ul>
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
              <li>
                {' '}
                <Link to="/login">
                  <a>Logout</a>
                </Link>
              </li>

              <li>
                <a onClick={this.clearData} style={{ cursor: 'pointer' }}>
                  Clear Data
                </a>
              </li>
            </ul>
          </nav>

          <Backdrop clicked={this.backdropClickHandler} />
        </div>
      );
    }

    return (
      <Router>
        {this.state.redirect ? this.goToPlan() : null}
        <div className="container">
          <Toolbar changesidedrawerstate={this.drawerToggleClickHandler} />
          {/* <SideDrawer show={this.state.isSideDrawerOpen} /> */}
          {sd_and_backdrop}
          {deleteConfirm}

          <main style={{ marginTop: '100px' }}>
            {/* <Plan />
          <View /> */}

            <div className="containerthree">
              <Link to="/plan">
                <button id="planbutton">Plan</button>
              </Link>
              <Link to="/record">
                <button id="recordbutton">Record</button>
              </Link>

              <Link to="/view">
                <button id="viewbutton">View</button>
              </Link>
            </div>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />

              <Route path="/record" component={RecordMainPage} />
              <Route path="/plan" component={Plan} />
              <Route path="/view" component={View} />
              <Route path="/editrecord" component={EditRecord} />
              <Route path="/delete" component={DeleteConfirmation} />
              <Route path="/" exact component={RecordMainPage} />
              <Route component={Plan} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
