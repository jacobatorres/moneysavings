import React, { Component } from 'react';
import axios from 'axios';

import RecordInputSpent from './InputSpent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/modal';

class ER extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    console.log(this.props);
  }

  render() {
    return <div>eow, booms {this.props.location.id}</div>;
  }
}

export default ER;
