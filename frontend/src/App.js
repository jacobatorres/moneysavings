import React, { Component } from 'react';
import axios from 'axios';

import Toolbar from './components/Toolbar/Toolbar';

import SideDrawer from './components/SideDrawer/SideDrawer';

import Backdrop from './components/Backdrop/Backdrop';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './App.css';

// import the other files
import RecordMainPage from './Record/RecordMainPage';

import Plan from './Plan/Plan';
import View from './View/View';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

    isSideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { isSideDrawerOpen: !prevState.isSideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ isSideDrawerOpen: false });
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

  render() {
    // let saved_val =
    //   parseFloat(this.state.planned) >= parseFloat(this.state.spent)
    //     ? true
    //     : false;

    // let result_saved = saved_val ? 'good!' : 'over the limit!';

    // let color_result = saved_val ? 'green' : 'red';

    let sideDrawer;
    let backdrop;

    if (this.state.isSideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Router>
        <div className="container">
          <Toolbar changesidedrawerstate={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.isSideDrawerOpen} />
          {backdrop}

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
            <Route path="/record" component={RecordMainPage} />
            <Route path="/plan" component={Plan} />
            <Route path="/view" component={View} />
            <Route path="/" exact component={RecordMainPage} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
