import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import RecordInputPlanned from './Record/InputPlanned';
import RecordInputSpent from './Record/InputSpent';

class App extends Component {
  state = {
    planned: 0,
    spent: 0
  };

  valuePlannedChanged = event => {
    this.setState({ planned: event.target.value });
  };

  valueSpentChanged = event => {
    this.setState({ spent: event.target.value });
  };

  saveRecordtoDB = event => {
    event.preventDefault();
    console.log('i made it here');

    // Send a POST request

    console.log(this.state);
    axios
      .post('http://localhost:3001/saveRecord', {
        planned: this.state.planned,
        spent: this.state.spent
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
    let saved_val =
      parseFloat(this.state.planned) >= parseFloat(this.state.spent)
        ? true
        : false;

    let result_saved = saved_val ? 'good!' : 'over the limit!';

    return (
      <div>
        hi!
        <form onSubmit={this.saveRecordtoDB}>
          <RecordInputPlanned
            changed={this.valuePlannedChanged}
            value={this.state.planned}
          />
          <RecordInputSpent
            changed={this.valueSpentChanged}
            value={this.state.spent}
          />
          <p>
            Result: <strong>{result_saved}</strong>
          </p>
          <button type="Submit">Save</button>
        </form>
      </div>
    );
  }
}

export default App;
