import React from 'react';

import './Input.css';
const RecordInputSpent = props => {
  return (
    <div className="font">
      <p> {props.label}</p>
      <input type="text" value={props.value} onChange={props.changed}></input>
    </div>
  );
};

export default RecordInputSpent;
