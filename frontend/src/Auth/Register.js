import React, { Component } from 'react';
import axios from 'axios';
import RecordInputSpent from '../Record/InputSpent';
import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/modal';

class Register extends Component {
  state = {
    name: '',
    password: '',
    clickRegister: false,
    modalMessage: ''
  };

  registertoDB = event => {
    event.preventDefault();

    // Send a POST request

    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);
    console.log('boom auth');
    console.log(axios_url);
    axios
      .post(axios_url + '/printregister', {
        username: this.state.name,
        password: this.state.password
      })
      .then(response => {
        if (response.data.error == 'UserExistsError') {
          this.setState({
            name: '',
            password: '',
            clickRegister: true,
            modalMessage: 'User Already Exists'
          });
        } else {
          this.setState({
            name: '',
            password: '',
            clickRegister: true,
            modalMessage: 'User Registered!'
          });
        }
        console.log('tumama anssd auth ');
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.log('nagkamali');
        console.log(error.response);
      });
  };

  changename = event => {
    this.setState({
      name: event.target.value
    });
  };
  changepassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  unshowBackdrop = () => {
    this.setState({ clickRegister: false });
  };

  render() {
    let showRegisterOk = null;
    if (this.state.clickRegister) {
      showRegisterOk = (
        <div>
          <Backdrop clicked={this.unshowBackdrop} />
          <Modal
            clicked={this.unshowBackdrop}
            message={this.state.modalMessage}
          />
        </div>
      );
    }
    return (
      <main style={{ marginTop: '100px' }}>
        {showRegisterOk}
        <form onSubmit={this.registertoDB} id="textalign">
          <strong>Register</strong>

          <p style={{ marginTop: '50px' }}></p>
          <RecordInputSpent
            label="Name"
            changed={this.changename}
            value={this.state.name}
          />
          <p style={{ marginTop: '10px' }}></p>

          <RecordInputSpent
            label="Password"
            changed={this.changepassword}
            value={this.state.password}
            inputtype="password"
          />
          <p style={{ marginTop: '30px' }}></p>
          <button type="Submit">Register</button>
        </form>
      </main>
    );
  }
}

export default Register;
