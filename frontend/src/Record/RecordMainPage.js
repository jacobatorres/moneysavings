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

  componentDidMount() {
    const month_number_rn = new Date().getMonth() + 1;
    const year_number_rn = new Date().getFullYear();

    console.log(month_number_rn);
    console.log(year_number_rn);

    const get_url_link = 'http://localhost:3001/getMonthPlan';

    console.log(get_url_link);
    // Optionally the request above could also be done as
    // Make a request for a user with a given ID
    axios
      .get('http://localhost:3001/getMonthPlan', {
        month_number: month_number_rn,
        year_number: year_number_rn
      })
      .then(response => {
        console.log('tumama i guess');
        console.log(response);
      })
      .catch(error => {
        console.log('nagkamali');
        console.log(error.response);
      });

    console.log('i am trued;');
    // // Make a request for a user with a given ID
    // axios
    //   .get('/user?ID=12345')
    //   .then(function(response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function() {
    //     // always executed
    //   });
  }

  render() {
    // check if month-plan exists

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
