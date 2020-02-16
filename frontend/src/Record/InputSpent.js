import React from 'react';

const RecordInputSpent = props => {
  return (
    <div>
      <p>
        {props.label}:
        <input type="text" value={props.value} onChange={props.changed}></input>
      </p>
    </div>
  );
};

export default RecordInputSpent;
