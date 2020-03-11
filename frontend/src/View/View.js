import React from 'react';

import './View.css';

function View() {
  return (
    <div class="middle">
      <div class="menu">
        <li class="item" id="item1">
          <a href="#item1" class="btn">
            Profile
          </a>
          <div class="smenu">
            <a href="">Posts </a>
            <a href="">Picture</a>
          </div>
        </li>

        <li class="item" id="item2">
          <a href="#item2" class="btn">
            Message
          </a>
          <div class="smenu">
            <a href="">new </a>
            <a href="">send</a>
            <a href="">spam</a>
          </div>
        </li>

        <li class="item" id="item3">
          <a href="#item3" class="btn">
            settings
          </a>
          <div class="smenu">
            <a href="">ow </a>
            <a href="">lang</a>
          </div>
        </li>

        <li class="item" id="item4">
          <a href="#item4" class="btn">
            Options
          </a>
          <div class="smenu">
            <a href="">help </a>
            <a href="">about</a>
          </div>
        </li>
      </div>

      <h1>eow view here</h1>
    </div>
  );
}

export default View;
