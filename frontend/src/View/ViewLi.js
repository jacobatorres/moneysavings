import React from 'react';

const ViewLi = props => {
  const hrefval = '#' + props.idval;

  let btn_class = 'btn';
  let smenu_class = 'smenu';

  if (props.colorsval == 'blue') {
    let btn_class = 'btn';
    let smenu_class = 'smenu';
  } else if (props.colorsval == 'green') {
    btn_class = 'btn good';
    smenu_class = 'smenu good';
  } else {
    btn_class = 'btn bad';
    smenu_class = 'smenu bad';
  }

  return (
    <li class="item" id={props.idval}>
      <a href={hrefval} class={btn_class}>
        {props.name}
      </a>
      <div class="smenu">
        {props.itemsval.map(item => (
          <a href="">{item}</a>
        ))}
      </div>
    </li>
  );
};

export default ViewLi;
