import React from 'react';

import moment from 'moment';
import './modal.css';

function printlist(listahan) {
  let list_to_return = [];

  let date = moment(listahan[listahan.length]).format('MM/DD/YYYY');
  console.log(listahan);
  list_to_return.push(<p>Date: {date}</p>);

  for (let i = 0; i < listahan.length - 2; i += 2) {
    if (listahan[i + 1] != '') {
      list_to_return.push(
        <p>
          {listahan[i + 1]} : {listahan[i]}
        </p>
      );
    }
  }

  return list_to_return;
}

const modal = props => (
  <div>
    {props.longmessage == '1' ? (
      <div className="Modal" onClick={props.clicked}>
        <p style={{ 'margin-bottom': '1em' }}>
          <strong>{props.message}</strong>
        </p>
        {printlist(props.values_list)}
      </div>
    ) : (
      <div className="Modal" onClick={props.clicked}>
        {props.message}
      </div>
    )}
  </div>
);

export default modal;
