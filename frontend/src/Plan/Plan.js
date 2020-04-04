import React, { Component } from 'react';
import axios from 'axios';

import RecordInputSpent from '../Record/InputSpent';

import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/modal';

import 'react-datepicker/dist/react-datepicker.css';

// two main server calls:

// when componentDidMount, check if the user already has a plan-month
// when hitting save, make sure it's only for this user

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
      leisure: 0,
    },

    clearedData: false,
    loggedInName: this.props.loggedInName,
  };

  getMonthIndex = () => {
    return new Date().getMonth();
  };

  getYear = () => {
    return new Date().getFullYear();
  };

  valueChangedTotalBill = (event) => {
    this.setState({
      bill: event.target.value,
    });
  };
  valueChangedTotalFood = (event) => {
    this.setState({
      food: event.target.value,
    });
  };
  valueChangedTotalTr = (event) => {
    this.setState({
      transportation: event.target.value,
    });
  };
  valueChangedTotalLeisure = (event) => {
    this.setState({
      leisure: event.target.value,
    });
  };

  getNumDaysinMonthYear = () => {
    const month_number_rn = parseFloat(new Date().getMonth() + 1);
    const year_number_rn = parseFloat(new Date().getFullYear());

    return new Date(year_number_rn, month_number_rn, 0).getDate();
  };

  adivideb = (a, b) => {
    let ans = (a * 1.0) / b;
    return ans.toFixed(2);
  };

  unshowBackdrop = (event) => {
    this.setState({ clearedData: false });
  };

  saveMonthPlantoDB = (event) => {
    event.preventDefault();

    // Send a POST request
    console.log('[plan] im about to save');
    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);
    console.log(this.state.loggedInName);

    axios
      .post(axios_url + '/saveMonthPlan', {
        total_bill: this.state.bill,
        total_food: this.state.food,
        total_tr: this.state.transportation,
        total_leisure: this.state.leisure,
        month_number: this.getMonthIndex(),
        year_number: this.getYear(),
        timestamp: new Date(
          this.getYear(),
          this.getMonthIndex(),
          1,
          0,
          0,
          0,
          0
        ),
        username: this.state.loggedInName,
      })
      .then((response) => {
        console.log('[plan] i saved properly!');
        console.log(response);
        this.setState({ doesMonthPlanExiststate: true });
        this.setState({
          month_record: {
            bills: parseFloat(response.data.total_bill),
            food: parseFloat(response.data.total_food),
            transportation: parseFloat(response.data.total_tr),
            leisure: parseFloat(response.data.total_leisure),
          },
          clearedData: true,
        });
      })
      .catch((error) => {
        console.log('[plan] i did not save properly!');
        console.log(error.response);
      });
  };

  componentDidMount() {
    // Send a POST request

    window.scrollTo(0, 0);
    const month_number_rn = new Date().getMonth() + 1;
    const year_number_rn = new Date().getFullYear();

    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);
    console.log('[plan] component did mount');

    axios
      .get(axios_url + '/getMonthPlan?' + 'username=' + this.state.loggedInName)
      .then((response) => {
        console.log(response);
        console.log('[plan] good response at /getmonthplan get');
        if (response.data == null) {
          this.setState({
            doesMonthPlanExiststate: false,
          });

          console.log('[plan]  monthplan doesnt exists');
        } else {
          this.setState({
            doesMonthPlanExiststate: true,
            month_record: {
              bills: parseFloat(response.data.total_bill),
              food: parseFloat(response.data.total_food),
              transportation: parseFloat(response.data.total_tr),
              leisure: parseFloat(response.data.total_leisure),
            },
          });
          console.log('[plan]  monthplan exists');
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log('[plan] bad.. this is catch');
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
      'December',
    ];
    let month_index = this.getMonthIndex();

    let month_result = months[month_index];

    let year_result = this.getYear();

    let bill_average = null,
      food_average = null,
      tr_average = null,
      leisure_average = null;
    let turntodisabled = null;
    if (this.state.doesMonthPlanExiststate) {
      turntodisabled = true;

      // the change could either be greater or smaller than average
      bill_average = this.adivideb(
        this.state.month_record.bills,
        this.getNumDaysinMonthYear()
      );

      food_average = this.adivideb(
        this.state.month_record.food,
        this.getNumDaysinMonthYear()
      );

      tr_average = this.adivideb(
        this.state.month_record.transportation,
        this.getNumDaysinMonthYear()
      );

      leisure_average = this.adivideb(
        this.state.month_record.leisure,
        this.getNumDaysinMonthYear()
      );
    }

    let displaySavedMessage = null;

    if (this.state.clearedData) {
      displaySavedMessage = (
        <div>
          <Backdrop clicked={this.unshowBackdrop} />
          <Modal clicked={this.unshowBackdrop} message="Record Saved" />
        </div>
      );
    }

    return (
      <div>
        {this.state.doesMonthPlanExiststate ? (
          <main style={{ marginTop: '100px' }} id="textalign">
            <div>
              For {month_result} {year_result}
            </div>
            <p style={{ marginTop: '50px' }}></p>

            <RecordInputSpent
              label="Bills"
              value={this.state.month_record.bills}
              turntodisabled="true"
            />
            <p>Daily Average for Bills: {bill_average}</p>
            <p style={{ marginTop: '30px' }}></p>

            <RecordInputSpent
              label="Food"
              value={this.state.month_record.food}
              turntodisabled="true"
            />

            <p>Daily Average for Food: {food_average}</p>
            <p style={{ marginTop: '30px' }}></p>

            <RecordInputSpent
              label="Transportation"
              value={this.state.month_record.transportation}
              turntodisabled="true"
            />

            <p>Daily Average for Transportation: {tr_average}</p>
            <p style={{ marginTop: '30px' }}></p>

            <RecordInputSpent
              label="Leisure"
              value={this.state.month_record.leisure}
              turntodisabled="true"
            />

            <p>Daily Average for Leisure: {leisure_average}</p>
            <p style={{ marginTop: '30px' }}></p>
            {displaySavedMessage}
          </main>
        ) : (
          <main style={{ marginTop: '100px' }}>
            <form onSubmit={this.saveMonthPlantoDB} id="textalign">
              For {month_result} {year_result}
              <p style={{ marginTop: '50px' }}></p>
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
