import React from 'react';

import './Backdrop.css';

const backdrop = props => {
  let class_backdrop = 'backdrop behind_sidedrawer';

  if (props.showafterSD) {
    class_backdrop = 'backdrop after_sidedrawer';
  }

  return <div className={class_backdrop} onClick={props.clicked}></div>;
};

export default backdrop;
