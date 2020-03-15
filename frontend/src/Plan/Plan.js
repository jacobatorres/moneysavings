import React, { Component } from 'react';
import axios from 'axios';

import RecordInputSpent from '../Record/InputSpent';
import 'react-datepicker/dist/react-datepicker.css';

class Plan extends Component {
  state = {
    bill: 0,
    food: 0,
    transportation: 0,
    leisure: 0,
    doesMonthPlanExiststate: true,
    month_record: {
      bills: 0,
      food: 0,
      transportation: 0,
      leisure: 0
    }
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

  getMonthTotals = event => {
    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);
    console.log('i am here at doesmonth plan');

    // axios
    // .get(axios_url + '/getMonthPlan')
    // .then(response => {
    //   console.log('I got the month');
    //   console.log(response);

    //   // as of now I am sure that the data exists...

    //   // get the bill, food, transportation, leisure

    //   this.setState({
    //     month_record: {
    //       bills: parseFloat(response.data.total_bill),
    //       food: parseFloat(response.data.total_food),
    //       transportation: parseFloat(response.data.total_tr),
    //       leisure: parseFloat(response.data.total_leisure)
    //     }
    //   });
    //   console.log(this.state);
    // }
  };

  doesMonthPlanExist = event => {
    // Send a POST request
    const month_number_rn = new Date().getMonth() + 1;
    const year_number_rn = new Date().getFullYear();
    let end_result = null;

    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);
    console.log('i am here at doesmonth plan');

    axios
      .get('/getMonthPlan', {
        params: {
          month_number: month_number_rn,
          year_number: year_number_rn
        }
      })
      .then(response => {
        console.log(response);
        console.log('success');
        if (response.data == null) {
          this.setState({ doesMonthPlanExiststate: false });
          this.setState({
            month_record: {
              bills: parseFloat(response.data.total_bill),
              food: parseFloat(response.data.total_food),
              transportation: parseFloat(response.data.total_tr),
              leisure: parseFloat(response.data.total_leisure)
            }
          });
        } else {
          this.setState({ doesMonthPlanExiststate: true });
        }
      })
      .catch(function(error) {
        console.log(error);
        end_result = error;
        return false;
      });

    return true;
    // event.preventDefault();

    // const month_number_rn = new Date().getMonth() + 1;
    // const year_number_rn = new Date().getFullYear();

    // console.log(month_number_rn);
    // console.log(year_number_rn);
    // // Optionally the request above could also be done as
    // let axios_url = 'https://moneysavings.herokuapp.com';
    // console.log(process.env.NODE_ENV);
    // if (process.env.NODE_ENV === 'development') {
    //   axios_url = 'http://localhost:3001';
    // }
    // console.log(axios_url);
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

  componentDidMount() {
    // Send a POST request
    const month_number_rn = new Date().getMonth() + 1;
    const year_number_rn = new Date().getFullYear();
    let end_result = null;

    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);
    console.log('i am here at doesmonth plan');

    axios
      .get('/getMonthPlan', {
        params: {
          month_number: month_number_rn,
          year_number: year_number_rn
        }
      })
      .then(response => {
        console.log(response);
        console.log('success');
        if (response.data == null) {
          this.setState({ doesMonthPlanExiststate: false });

          console.log('im false');
        } else {
          this.setState({ doesMonthPlanExiststate: true });
          this.setState({
            month_record: {
              bills: parseFloat(response.data.total_bill),
              food: parseFloat(response.data.total_food),
              transportation: parseFloat(response.data.total_tr),
              leisure: parseFloat(response.data.total_leisure)
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        end_result = error;
      });
  }

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

    let turntodisabled = null;
    if (this.state.doesMonthPlanExiststate) {
      turntodisabled = true;
    }

    return (
      <div>
        {this.state.doesMonthPlanExiststate ? (
          <main style={{ marginTop: '100px' }}>
            <form onSubmit={this.saveMonthPlantoDB} id="textalign">
              For {month_result} {year_result}
              <RecordInputSpent
                label="Bills"
                value={this.state.month_record.bills}
                turntodisabled="true"
              />
              <RecordInputSpent
                label="Food"
                value={this.state.month_record.food}
                turntodisabled="true"
              />
              <RecordInputSpent
                label="Transportation"
                value={this.state.month_record.transportation}
                turntodisabled="true"
              />
              <RecordInputSpent
                label="Leisure"
                value={this.state.month_record.leisure}
                turntodisabled="true"
              />
              <p style={{ marginTop: '40px' }}></p>
              <button type="Submit" disabled>
                Save
              </button>
            </form>
          </main>
        ) : (
          <main style={{ marginTop: '100px' }}>
            <form onSubmit={this.saveMonthPlantoDB} id="textalign">
              For {month_result} {year_result}
              <RecordInputSpent
                label="Bills"
                changed={this.valueChangedTotalBill}
              />
              <RecordInputSpent
                label="Food"
                changed={this.valueChangedTotalFood}
              />
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
        )}
      </div>
    );
  }
}
export default Plan;
