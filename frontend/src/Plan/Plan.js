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

  doesMonthPlanExist = event => {
    event.preventDefault();

    const month_number_rn = new Date().getMonth() + 1;
    const year_number_rn = new Date().getFullYear();

    console.log(month_number_rn);
    console.log(year_number_rn);
    // Optionally the request above could also be done as
    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);

    axios
      .get('/getMonthPlan', {
        params: {
          month_number: month_number_rn,
          year_number: year_number_rn
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        // always executed
        console.log('dont 4get to like and subscribe');
      });
  };

  saveMonthPlantoDB = event => {
    event.preventDefault();

    // Send a POST request
    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);

    axios
      .post(axios_url + '/saveMonthPlan', {
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
          <button type="Submit">Save</button>
        </form>
      </main>
    );
  }
}
export default Plan;
