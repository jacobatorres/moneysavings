import React, { Component } from 'react';
import axios from 'axios';
import RecordInputSpent from '../Record/InputSpent';
import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/modal';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    name: '',
    password: '',
    clickLogin: false,
    modalMessage: '',
    redirecttoPlan: false,
    loginSuccess: false
  };

  logintoDB = event => {
    event.preventDefault();

    // Send a POST request

    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);
    console.log('boom auth login');
    console.log(axios_url);
    axios
      .post(axios_url + '/login', {
        username: this.state.name,
        password: this.state.password
      })
      .then(response => {
        // reponse.data == Unauthorized, means invalid
        // else, it's good

        if (response.data == 'Unauthorized') {
          this.setState({
            modalMessage: 'Unauthorized User',
            clickLogin: true,
            loginSuccess: false
          });
        } else {
          this.setState({
            modalMessage:
              'Successful Login! Welcome ' + response.data.username + '!',
            clickLogin: true,
            loginSuccess: true
          });
        }
      })
      .catch(error => {
        this.setState({
          modalMessage: 'Unauthorized User',
          clickLogin: true,
          loginSuccess: false
        });

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
    this.setState({ clickLogin: false, redirecttoPlan: true });
  };

  goToPlan = () => {
    if (this.state.redirecttoPlan && this.state.loginSuccess) {
      return <Redirect to="/plan" />;
    }
  };

  render() {
    let showRegisterOk = null;
    if (this.state.clickLogin) {
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
        I am at login....
        {this.goToPlan()}
        {showRegisterOk}
        <form onSubmit={this.logintoDB} id="textalign">
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
          <button type="Submit">Login</button>
        </form>
      </main>
    );
  }
}

export default Login;
