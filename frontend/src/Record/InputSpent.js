import React from 'react';

const RecordInputSpent = props => {
  return (
    <div>
      <p>Enter spent:</p>
      <input type="text" value={props.value} onChange={props.changed}></input>
    </div>
  );
};

export default RecordInputSpent;
