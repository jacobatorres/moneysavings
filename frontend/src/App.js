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
    console.log('hi!');
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
        <button onClick={this.saveRecordtoDB}>Save</button>
      </div>
    );
  }
}

export default App;
