import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const ViewLi = props => {
  const hrefval = '#' + props.idvalcss;

  let btn_class = null;
  let smenu_class = null;

  if (props.colorsval == 'red') {
    btn_class = 'btn bad';
    smenu_class = 'smenu bad';
  } else {
    btn_class = 'btn good';
    smenu_class = 'smenu good';
  }

  return (
    <li className="item" id={props.idvalcss}>
      <a href={hrefval} className={btn_class}>
        {props.name}
      </a>
      <div className="smenu">
        {props.itemsval.map(item => (
          <ul>
            <li className="alignleft">{item[0]}</li>
            <li className="alignright">
              <Link
                to={{
                  pathname: '/editrecord',
                  day_id: item[1]
                }}
              >
                <a className="link_color">edit</a>
              </Link>{' '}
              | <a className="link_color">delete</a>
            </li>
          </ul>
        ))}
      </div>
    </li>
  );
};

// for delete:
// when clicked, it invokes a function, that has an axios command
// then it will tap the server, delete the data, then
// the axios will say "deleted"
// then the page will refresh

export default ViewLi;
