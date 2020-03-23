import React from 'react';

import './modal.css';

const modal = props => (
  <div className="Modal" onClick={props.clicked}>
    {props.message}
  </div>
);

export default modal;
