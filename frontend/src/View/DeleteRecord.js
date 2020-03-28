import React, { Component } from 'react';
import axios from 'axios';

import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/modal';

class DeleteConfirmation extends Component {
  state = {
    bill_value: 0,
    bill_label: '',
    food_value: 0,
    food_label: '',
    tr_value: 0,
    tr_label: '',
    leisure_value: 0,
    leisure_label: '',
    startDate: null,
    clickSaveRecord: true
  };

  componentDidMount() {
    // given the ID, get the needed info

    window.scrollTo(0, 0);
    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);

    axios
      .get(axios_url + '/getDay?' + 'id=' + this.props.location.day_id)
      .then(response => {
        console.log('got the date on delete');
        this.setState({
          bill_value: response.data.bill_value,
          bill_label: response.data.bill_label,
          food_value: response.data.food_value,
          food_label: response.data.food_label,
          tr_value: response.data.tr_value,
          tr_label: response.data.tr_label,
          leisure_value: response.data.leisure_value,
          leisure_label: response.data.leisure_label,
          startDate: Date.parse(response.data.timestamp)
        });
      })
      .catch(error => {
        console.log('test respornt bad');
      });
  }

  unshowBackdrop = event => {
    this.setState({ clickSaveRecord: false });
    setTimeout(function() {
      window.location.reload();
    });
  };

  render() {
    let showBackdropSaved = null;

    let message_modal = this.state.bill_label;

    if (this.state.clickSaveRecord) {
      showBackdropSaved = (
        <div>
          <Backdrop clicked={this.unshowBackdrop} />
          <Modal clicked={this.unshowBackdrop} message={message_modal} />
        </div>
      );
    }

    return <div>{this.state.clickSaveRecord ? showBackdropSaved : null}</div>;
  }
}

export default DeleteConfirmation;
