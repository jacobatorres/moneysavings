import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import RecordInputPlanned from './Record/InputPlanned';
import RecordInputSpent from './Record/InputSpent';
import flatpickr from 'flatpickr';

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
    datePicker: React.createRef()
  };
  onChange(selectedDates, dateStr, instance) {
    console.log(selectedDates);
  }

  componentDidMount() {
    flatpickr(this.state.datePicker, {
      onChange: this.onChange
    });
  }

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

        bill_label: this.state.bill_value,
        food_label: this.state.food_value,
        tr_label: this.state.tr_value,
        leisure_label: this.state.leisure_value
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
            changed={this.valuePlannedChangedBill}
            value={this.state.leisure_label}
          />
          {/* <p className={color_result}>
            Result: <strong>{result_saved}</strong>
          </p> */}
          <input type="date" ref={this.state.datePicker} />

          <button type="Submit">Save</button>
        </form>
      </div>
    );
  }
}

export default App;
