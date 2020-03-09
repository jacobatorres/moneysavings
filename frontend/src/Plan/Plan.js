import React, { Component } from 'react';
import axios from 'axios';

import RecordInputSpent from '../Record/InputSpent';
import 'react-datepicker/dist/react-datepicker.css';

class Plan extends Component {
  state = {
    bill: 0,
    food: 0,
    transportation: 0,
    leisure: 0
  };

  getMonthIndex = () => {
    return new Date().getMonth();
  };

  getYear = () => {
    return new Date().getFullYear();
  };

  valueChangedTotalBill = event => {
    this.setState({
      bill: event.target.value
    });
  };
  valueChangedTotalFood = event => {
    this.setState({
      food: event.target.value
    });
  };
  valueChangedTotalTr = event => {
    this.setState({
      transportation: event.target.value
    });
  };
  valueChangedTotalLeisure = event => {
    this.setState({
      leisure: event.target.value
    });
  };

  saveMonthPlantoDB = event => {
    event.preventDefault();

    // Send a POST request

    console.log(this.state);
    axios
      .post('http://localhost:3001/saveMonthPlan', {
        total_bill: this.state.bill,
        total_food: this.state.food,
        total_tr: this.state.transportation,
        total_leisure: this.state.leisure,
        month_number: this.getMonthIndex(),
        year_number: this.getYear(),
        timestamp: new Date(this.getYear(), this.getMonthIndex(), 1, 0, 0, 0, 0)
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
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let month_index = this.getMonthIndex();

    let month_result = months[month_index];

    let year_result = this.getYear();

    return (
      <main style={{ marginTop: '100px' }}>
        <form onSubmit={this.saveMonthPlantoDB} id="textalign">
          For {month_result} {year_result}
          <RecordInputSpent
            label="Bills"
            changed={this.valueChangedTotalBill}
          />
          <RecordInputSpent label="Food" changed={this.valueChangedTotalFood} />
          <RecordInputSpent
            label="Transportation"
            changed={this.valueChangedTotalTr}
          />
          <RecordInputSpent
            label="Leisure"
            changed={this.valueChangedTotalLeisure}
          />
          <p style={{ marginTop: '40px' }}></p>
          <button type="Submit">Save (Can't be Undone)</button>
        </form>
      </main>
    );
  }
}
export default Plan;
