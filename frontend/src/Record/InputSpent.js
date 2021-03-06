import React from 'react';

import './Input.css';
const RecordInputSpent = props => {
  let input_result = (
    <input type="text" value={props.value} onChange={props.changed}></input>
  );

  if (!props.hasbeentoggled) {
    if (props.label.search('Label') >= 0) {
      input_result = (
        <input
          type="text"
          value={props.value}
          onChange={props.changed}
          disabled
        ></input>
      );
    }
  }

  if (props.turntodisabled == 'true') {
    input_result = (
      <input
        type="text"
        value={props.value}
        onChange={props.changed}
        disabled
      ></input>
    );
  }

  if (props.inputtype == 'password') {
    input_result = (
      <input
        type="password"
        value={props.value}
        onChange={props.changed}
      ></input>
    );
  }

  return (
    <div className="font">
      <p>{props.label}</p>
      {input_result}
    </div>
  );
};

export default RecordInputSpent;
