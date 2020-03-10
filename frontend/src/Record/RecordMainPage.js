import React, { Component } from 'react';
import axios from 'axios';

import RecordInputSpent from './InputSpent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class RecordMainPage extends Component {
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

    doesMonthPlanexist: false,

    month_record: {
      bills: 0,
      food: 0,
      transportation: 0,
      leisure: 0
    }
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
        timestamp: this.state.startDate,
        month_num: new Date().getMonth() + 1,
        year_num: new Date().getFullYear()
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
    // given the month and year,
    // get the plan of the month

    axios
      .get('http://localhost:3001/getMonthPlan')
      .then(response => {
        console.log('I got the month');
        console.log(response);

        // as of now I am sure that the data exists...

        // get the bill, food, transportation, leisure

        this.setState({
          month_record: {
            bills: parseFloat(response.data.total_bill),
            food: parseFloat(response.data.total_food),
            transportation: parseFloat(response.data.total_tr),
            leisure: parseFloat(response.data.total_leisure)
          }
        });
        console.log(this.state);
      })
      .catch(error => {
        console.log('nagkamali');
        console.log(error.response);
      });
  }

  showMessage = (average, user_input) => {
    if (average < parseFloat(user_input)) {
      return 'Greater than average (' + average + ')';
    } else {
      return 'Within the limit (' + average + ')';
    }
  };

  showColor = (average, user_input) => {
    if (average < parseFloat(user_input)) {
      return 'red';
    } else {
      return 'green';
    }
  };

  render() {
    // check if month-plan exists

    let bill_message = null;
    let bill_color = null;
    if (this.state.toggled_bill_value) {
      // the change could either be greater or smaller than average

      let bill_average = this.adivideb(
        this.state.month_record.bills,
        this.getNumDaysinMonthYear()
      );

      bill_message = this.showMessage(bill_average, this.state.bill_value);
      bill_color = this.showColor(bill_average, this.state.bill_value);
    }

    let food_message = null;
    let food_color = null;
    if (this.state.toggled_food_value) {
      // the change could either be greater or smaller than average

      let food_average = this.adivideb(
        this.state.month_record.food,
        this.getNumDaysinMonthYear()
      );

      food_message = this.showMessage(food_average, this.state.food_value);
      food_color = this.showColor(food_average, this.state.food_value);
    }

    let tr_message = null;
    let tr_color = null;
    if (this.state.toggled_tr_value) {
      // the change could either be greater or smaller than average

      let tr_average = this.adivideb(
        this.state.month_record.transportation,
        this.getNumDaysinMonthYear()
      );

      tr_message = this.showMessage(tr_average, this.state.tr_value);
      tr_color = this.showColor(tr_average, this.state.tr_value);
    }

    let leisure_message = null;
    let leisure_color = null;
    if (this.state.toggled_leisure_value) {
      // the change could either be greater or smaller than average

      let leisure_average = this.adivideb(
        this.state.month_record.leisure,
        this.getNumDaysinMonthYear()
      );

      leisure_message = this.showMessage(
        leisure_average,
        this.state.leisure_value
      );
      leisure_color = this.showColor(leisure_average, this.state.leisure_value);
    }

    return (
      <main style={{ marginTop: '100px' }}>
        <form onSubmit={this.saveRecordtoDB} id="textalign">
          <div id="textalign">
            <p>Date</p>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </div>
          <p style={{ marginTop: '50px' }}></p>

          <RecordInputSpent
            label="Bills"
            changed={this.valuePlannedChangedBill}
            value={this.state.bill_value}
          />
          <div className={bill_color}>{bill_message}</div>
          <RecordInputSpent
            hasbeentoggled={this.state.toggled_bill_value}
            label="Bills Label"
            changed={this.labelPlannedChangedBill}
            value={this.state.bill_label}
          />
          <RecordInputSpent
            label="Food"
            changed={this.valuePlannedChangedFood}
            value={this.state.food_value}
          />
          <div className={food_color}>{food_message}</div>

          <RecordInputSpent
            hasbeentoggled={this.state.toggled_food_value}
            label="Food Label"
            changed={this.labelPlannedChangedFood}
            value={this.state.food_label}
          />
          <RecordInputSpent
            label="Transportation"
            changed={this.valuePlannedChangedTr}
            value={this.state.tr_value}
          />
          <div className={tr_color}>{tr_message}</div>

          <RecordInputSpent
            hasbeentoggled={this.state.toggled_tr_value}
            label="Transportation Label"
            changed={this.labelPlannedChangedTr}
            value={this.state.tr_label}
          />
          <RecordInputSpent
            label="Leisure"
            changed={this.valuePlannedChangedLeisure}
            value={this.state.leisure_value}
          />
          <div className={leisure_color}>{leisure_message}</div>

          <RecordInputSpent
            hasbeentoggled={this.state.toggled_leisure_value}
            label="Leisure Label"
            changed={this.labelPlannedChangedleisure}
            value={this.state.leisure_label}
          />
          <p style={{ marginTop: '40px' }}></p>
          <button type="Submit">Save</button>
        </form>
      </main>
    );
  }
}

export default RecordMainPage;
