import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import RecordInputPlanned from './Record/InputPlanned';
import RecordInputSpent from './Record/InputSpent';

class App extends Component {
  state = {
    bill_value: 0,
    food_value: 0,
    tr_value: 0,
    leisure_value: 0
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
        leisure_value: this.state.leisure_value
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

    return (
      <div>
        MoneySavingsApp
        <form onSubmit={this.saveRecordtoDB}>
          <RecordInputSpent
            label="Bills"
            changed={this.valuePlannedChangedBill}
            value={this.state.bill_value}
          />
          <RecordInputSpent
            label="Food"
            changed={this.valuePlannedChangedFood}
            value={this.state.food_value}
          />
          <RecordInputSpent
            label="Transportation"
            changed={this.valuePlannedChangedTr}
            value={this.state.tr_value}
          />

          <RecordInputSpent
            label="Leisure"
            changed={this.valuePlannedChangedLeisure}
            value={this.state.leisure_value}
          />
          {/* <p className={color_result}>
            Result: <strong>{result_saved}</strong>
          </p> */}
          <button type="Submit">Save</button>
        </form>
      </div>
    );
  }
}

export default App;
