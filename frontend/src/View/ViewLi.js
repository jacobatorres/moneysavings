import React from 'react';

const ViewLi = props => {
  const hrefval = '#' + props.idval;

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
    <li className="item" id={props.idval}>
      <a href={hrefval} className={btn_class}>
        {props.name}
      </a>
      <div className="smenu">
        {props.itemsval.map(item => (
          <ul>
            <li className="alignleft">{item}</li>
            <li className="alignright">
              <a className="link_color" href="/">
                edit
              </a>{' '}
              |{' '}
              <a className="link_color" href="/">
                delete
              </a>
            </li>
          </ul>
        ))}
      </div>
    </li>
  );
};

export default ViewLi;
