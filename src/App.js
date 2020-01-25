import React from 'react';
import './App.css';

import RecordInputPlanned from './Record/InputPlanned';
import RecordInputSpent from './Record/InputSpent';

import RecordOutput from './Record/Output';

function App() {
  return (
    <div>
      hi!
      <RecordInputPlanned />
      <RecordInputSpent />
      <RecordOutput />
    </div>
  );
}

export default App;
