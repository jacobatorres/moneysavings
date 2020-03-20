import React from 'react';

import './modal.css';

const modal = props => (
  <div className="Modal" onClick={props.clicked}>
    Record Saved!
  </div>
);

export default modal;
