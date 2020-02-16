import React from 'react';

const RecordInputPlanned = props => {
  return (
    <div>
      <p>{props.label}</p>
      <input type="text" value={props.value} onChange={props.changed}></input>
    </div>
  );
};

export default RecordInputPlanned;
