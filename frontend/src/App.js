import React, { Component } from 'react';
import axios from 'axios';

import Toolbar from './components/Toolbar/Toolbar';

import SideDrawer from './components/SideDrawer/SideDrawer';

import Backdrop from './components/Backdrop/Backdrop';
import RecordInputPlanned from './Record/InputPlanned';
import RecordInputSpent from './Record/InputSpent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './App.css';
class App extends Component {
  state = {
    bill_value: 0,
    bill_label: 'bill label',
    food_value: 0,
    food_label: 'food label',
    tr_value: 0,
    tr_label: 'transportation label',
    leisure_value: 0,
    leisure_label: 'leisure label',
    startDate: new Date(),

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
    this.setState({ bill_value: event.target.value });
  };

  valuePlannedChangedFood = event => {
    this.setState({ food_value: event.target.value });
  };

  valuePlannedChangedTr = event => {
    this.setState({ tr_value: event.target.value });
  };

  valuePlannedChangedLeisure = event => {
    this.setState({ leisure_value: event.target.value });
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
      <div className="container">
        <Toolbar changesidedrawerstate={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.isSideDrawerOpen} />
        {backdrop}

        <main style={{ marginTop: '100px' }}>
          <div id="containerthree">
            <button id="planbutton">Plan</button>
            <button id="viewbutton">View</button>
            <button id="recordbutton">Record</button>
          </div>

          <form onSubmit={this.saveRecordtoDB} id="textalign">
            <RecordInputSpent
              label="Bills"
              changed={this.valuePlannedChangedBill}
              value={this.state.bill_value}
            />
            <RecordInputSpent
              label="Bills Label"
              changed={this.labelPlannedChangedBill}
              value={this.state.bill_label}
            />
            <RecordInputSpent
              label="Food"
              changed={this.valuePlannedChangedFood}
              value={this.state.food_value}
            />
            <RecordInputSpent
              label="Food Label"
              changed={this.labelPlannedChangedFood}
              value={this.state.food_label}
            />
            <RecordInputSpent
              label="Transportation"
              changed={this.valuePlannedChangedTr}
              value={this.state.tr_value}
            />
            <RecordInputSpent
              label="Transportation Label"
              changed={this.labelPlannedChangedTr}
              value={this.state.tr_label}
            />
            <RecordInputSpent
              label="Leisure"
              changed={this.valuePlannedChangedLeisure}
              value={this.state.leisure_value}
            />
            <RecordInputSpent
              label="Leisure Label"
              changed={this.labelPlannedChangedleisure}
              value={this.state.leisure_label}
            />
            <p id="textalign">
              <p>Date</p>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </p>
            <button type="Submit">Save</button>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
