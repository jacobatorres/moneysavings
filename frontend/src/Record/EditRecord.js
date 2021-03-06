import React, { Component } from 'react';
import axios from 'axios';

import RecordInputSpent from './InputSpent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/modal';

class RecordMainPage extends Component {
  state = {
    bill_value: 0,
    bill_label: '',
    food_value: 0,
    food_label: '',
    tr_value: 0,
    tr_label: '',
    leisure_value: 0,
    leisure_label: '',
    startDate: new Date(),

    id: '',

    toggled_bill_value: false,
    toggled_food_value: false,
    toggled_tr_value: false,
    toggled_leisure_value: false,

    isSideDrawerOpen: false,

    doesMonthPlanexist: false,

    month_record: {
      bills: 0,
      food: 0,
      transportation: 0,
      leisure: 0,
    },

    running_totals: {
      bill: 0,
      food: 0,
      transportation: 0,
      leisure: 0,
    },

    clickSaveRecord: false,
    loggedInName: this.props.loggedInName,
    modalDisplay: '',
  };

  getNumDaysinMonthYear = () => {
    const month_number_rn = parseFloat(new Date().getMonth() + 1);
    const year_number_rn = parseFloat(new Date().getFullYear());

    return new Date(year_number_rn, month_number_rn, 0).getDate();
  };

  adivideb = (a, b) => {
    let ans = (a * 1.0) / b;
    return ans.toFixed(2);
  };

  aplusb = (a, b) => {
    if (b == '0' || b == '') {
      b = 0;
    }
    return parseFloat(a) + parseFloat(b);
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { isSideDrawerOpen: !prevState.isSideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ isSideDrawerOpen: false });
  };

  handleChange = (date) => {
    console.log(date);
    this.setState({
      startDate: date,
    });
  };
  valuePlannedChangedBill = (event) => {
    this.setState({
      bill_value: event.target.value,
      toggled_bill_value: true,
    });
  };

  valuePlannedChangedFood = (event) => {
    this.setState({
      food_value: event.target.value,
      toggled_food_value: true,
    });
  };

  valuePlannedChangedTr = (event) => {
    this.setState({
      tr_value: event.target.value,
      toggled_tr_value: true,
    });
  };

  valuePlannedChangedLeisure = (event) => {
    this.setState({
      leisure_value: event.target.value,
      toggled_leisure_value: true,
    });
  };

  labelPlannedChangedBill = (event) => {
    this.setState({ bill_label: event.target.value });
  };
  labelPlannedChangedFood = (event) => {
    this.setState({ food_label: event.target.value });
  };
  labelPlannedChangedTr = (event) => {
    this.setState({ tr_label: event.target.value });
  };
  labelPlannedChangedleisure = (event) => {
    this.setState({ leisure_label: event.target.value });
  };

  showMessage = (average, user_input) => {
    if (average < parseFloat(user_input)) {
      return 'Greater than average (' + average + ')';
    } else {
      return 'Within the limit (' + average + ')';
    }
  };

  showColor = (average, user_input) => {
    if (average < parseFloat(user_input)) {
      return 'red';
    } else {
      return 'green';
    }
  };

  showMessageRunningTotal = (running_total, allocated_value) => {
    if (allocated_value < running_total) {
      // bad
      return (
        'Running Total After Save: x / total: (' +
        running_total +
        ' / ' +
        allocated_value +
        ')'
      );
    } else {
      return 'Under the ';
    }
  };

  getMonthIndex = () => {
    return new Date().getMonth();
  };

  getYear = () => {
    return new Date().getFullYear();
  };

  unshowBackdrop = (event) => {
    this.setState({ clickSaveRecord: false });
    // window.location.reload(false);
  };

  saveRecordtoDB = (event) => {
    event.preventDefault();

    // get the values first so we can update the modal

    let forDisplay = {
      bill_value: this.state.bill_value,
      bill_label: this.state.bill_label,

      food_value: this.state.food_value,
      food_label: this.state.food_label,

      tr_value: this.state.tr_value,
      tr_label: this.state.tr_label,

      leisure_value: this.state.leisure_value,
      leisure_label: this.state.leisure_label,
      timestamp: this.state.startDate,
    };

    console.log('[Edit Record] Saving edited record');
    // make a PUT request
    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }

    console.log('Now doing a PUT request...');
    console.log(axios_url);
    axios
      .put(axios_url + '/updateDay', {
        bill_value: this.state.bill_value,
        food_value: this.state.food_value,
        tr_value: this.state.tr_value,
        leisure_value: this.state.leisure_value,
        bill_label: this.state.bill_label,
        food_label: this.state.food_label,
        tr_label: this.state.tr_label,
        leisure_label: this.state.leisure_label,
        timestamp: this.state.startDate,
        id: this.props.location.day_id,
      })
      .then((response) => {
        console.log('Updated successfully');
        console.log(response);
        this.setState({
          bill_value: 0,
          bill_label: '',
          food_value: 0,
          food_label: '',
          tr_value: 0,
          tr_label: '',
          leisure_value: 0,
          leisure_label: '',
          startDate: new Date(),

          toggled_bill_value: false,
          toggled_food_value: false,
          toggled_tr_value: false,
          toggled_leisure_value: false,
          clickSaveRecord: true,
          modalDisplay: { ...forDisplay },
        });
      })
      .catch((error) => {
        console.log('Something went wrong with the PUT request');
        console.log(error.response);
      });
  };

  componentDidMount() {
    // we are in edit record

    // get the needed information for month total and running total
    // after that, populate the input fields given this.props.location.day_id is the mainID

    window.scrollTo(0, 0);

    // get the needed information for month total and running total
    console.log('[EditRecord] Component Did mount');

    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);

    console.log('Getting month plan (should exist)');
    axios
      .get(axios_url + '/getMonthPlan?' + 'username=' + this.state.loggedInName)
      .then((response) => {
        console.log('I got the month. Here it is:');
        console.log(response);

        if (response.data == null) {
          this.setState({ doesMonthPlanexist: false });
        } else {
          this.setState({ doesMonthPlanexist: true });
          this.setState({
            month_record: {
              bills: parseFloat(response.data.total_bill),
              food: parseFloat(response.data.total_food),
              transportation: parseFloat(response.data.total_tr),
              leisure: parseFloat(response.data.total_leisure),
            },
          });

          console.log(
            'Getting the day records corresponding from the month-plan'
          );

          // once you get the totals, then get the day records

          // let axios_url = 'https://moneysavings.herokuapp.com';
          // console.log(process.env.NODE_ENV);
          // if (process.env.NODE_ENV === 'development') {
          //   axios_url = 'http://localhost:3001';
          // }
          // console.log(axios_url);

          axios
            .get(
              axios_url +
                '/getDaysFromMonthPlan?' +
                'username=' +
                this.state.loggedInName
            )
            .then((response) => {
              console.log('I got all the corresponding days. Here they are:');
              console.log(response);

              console.log('Computing running total...');
              // get the running total for bill, food, transportation, leisure

              let running_totals = {
                bill: 0,
                food: 0,
                transportation: 0,
                leisure: 0,
              };

              // you dont want to add the ID from the response data

              console.log('Note that the current data should be removed');

              let id_to_omit = this.props.location.day_id;
              console.log(id_to_omit);

              Object.keys(response.data).map(function (key, index) {
                console.log(response.data[key]._id);
                if (response.data[key]._id != id_to_omit) {
                  running_totals.bill += response.data[key].bill_value;
                  running_totals.food += response.data[key].food_value;
                  running_totals.transportation += response.data[key].tr_value;
                  running_totals.leisure += response.data[key].leisure_value;
                }
              });

              this.state.running_totals = running_totals;

              console.log('Running total has been computed.');

              // using the ID, populate the fields

              axios
                .get(
                  axios_url + '/getDay?' + 'id=' + this.props.location.day_id
                )
                .then((response) => {
                  console.log(
                    'Successfully pinged record. Update state from the day record you got'
                  );
                  this.setState({
                    bill_value: response.data.bill_value,
                    bill_label: response.data.bill_label,
                    food_value: response.data.food_value,
                    food_label: response.data.food_label,
                    tr_value: response.data.tr_value,
                    tr_label: response.data.tr_label,
                    leisure_value: response.data.leisure_value,
                    leisure_label: response.data.leisure_label,
                    startDate: Date.parse(response.data.timestamp),
                  });
                })
                .catch((error) => {
                  console.log('Error in getting day to update');
                });
            })
            .catch((error) => {
              console.log('nagkamali sa running totals ???');
              console.log(error.response);
            });
        }
      })
      .catch((error) => {
        console.log('Error in getting Month plan');
        console.log(error.response);
      });
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // render

  render() {
    // check if month-plan exists

    let bill_message = null;
    let bill_color = null;
    if (this.state.toggled_bill_value) {
      // the change could either be greater or smaller than average

      let bill_average = this.adivideb(
        this.state.month_record.bills,
        this.getNumDaysinMonthYear()
      );

      bill_message = this.showMessage(bill_average, this.state.bill_value);
      bill_color = this.showColor(bill_average, this.state.bill_value);
    }

    let bill_message2 = null;
    let bill_color2 = null;

    if (this.state.toggled_bill_value) {
      // add the running total and the current input
      // if sum is greater than allocated total, say that Running Total After Save: x / total
      let running_total_bill = this.aplusb(
        this.state.running_totals.bill,
        this.state.bill_value
      );

      bill_message2 =
        'Running Total After Save: (' +
        running_total_bill +
        ' / ' +
        this.state.month_record.bills +
        ')';

      bill_color2 = this.showColor(
        this.state.month_record.bills,
        running_total_bill
      ); // taking advantage of current function;
    }

    let food_message = null;
    let food_color = null;
    if (this.state.toggled_food_value) {
      // the change could either be greater or smaller than average

      let food_average = this.adivideb(
        this.state.month_record.food,
        this.getNumDaysinMonthYear()
      );

      food_message = this.showMessage(food_average, this.state.food_value);
      food_color = this.showColor(food_average, this.state.food_value);
    }

    let food_message2 = null;
    let food_color2 = null;

    if (this.state.toggled_food_value) {
      // add the running total and the current input
      // if sum is greater than allocated total, say that Running Total After Save: x / total
      let running_total_food = this.aplusb(
        this.state.running_totals.food,
        this.state.food_value
      );

      food_message2 =
        'Running Total After Save: (' +
        running_total_food +
        ' / ' +
        this.state.month_record.food +
        ')';

      food_color2 = this.showColor(
        this.state.month_record.food,
        running_total_food
      ); // taking advantage of current function;
    }

    let tr_message = null;
    let tr_color = null;
    if (this.state.toggled_tr_value) {
      // the change could either be greater or smaller than average

      let tr_average = this.adivideb(
        this.state.month_record.transportation,
        this.getNumDaysinMonthYear()
      );

      tr_message = this.showMessage(tr_average, this.state.tr_value);
      tr_color = this.showColor(tr_average, this.state.tr_value);
    }

    let tr_message2 = null;
    let tr_color2 = null;

    if (this.state.toggled_tr_value) {
      // add the running total and the current input
      // if sum is greater than allocated total, say that Running Total After Save: x / total
      let running_total_tr = this.aplusb(
        this.state.running_totals.transportation,
        this.state.tr_value
      );

      tr_message2 =
        'Running Total After Save: (' +
        running_total_tr +
        ' / ' +
        this.state.month_record.transportation +
        ')';

      tr_color2 = this.showColor(
        this.state.month_record.transportation,
        running_total_tr
      ); // taking advantage of current function;
    }

    let leisure_message = null;
    let leisure_color = null;
    if (this.state.toggled_leisure_value) {
      // the change could either be greater or smaller than average

      let leisure_average = this.adivideb(
        this.state.month_record.leisure,
        this.getNumDaysinMonthYear()
      );

      leisure_message = this.showMessage(
        leisure_average,
        this.state.leisure_value
      );
      leisure_color = this.showColor(leisure_average, this.state.leisure_value);
    }

    let leisure_message2 = null;
    let leisure_color2 = null;

    if (this.state.toggled_leisure_value) {
      // add the running total and the current input
      // if sum is greater than allocated total, say that Running Total After Save: x / total
      let running_total_leisure = this.aplusb(
        this.state.running_totals.leisure,
        this.state.leisure_value
      );

      leisure_message2 =
        'Running Total After Save: (' +
        running_total_leisure +
        ' / ' +
        this.state.month_record.leisure +
        ')';

      leisure_color2 = this.showColor(
        this.state.month_record.leisure,
        running_total_leisure
      ); // taking advantage of current function;
    }
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let month_index = this.getMonthIndex();

    let month_result = months[month_index];

    let year_result = this.getYear();

    // if month-plan exists, show the input
    // else, redirect them to the plan page

    // if user clicked save, do something
    // show backdrop
    let showBackdropSaved = null;

    if (this.state.clickSaveRecord) {
      let list_for_modal = [];
      Object.keys(this.state.modalDisplay).map((item) =>
        list_for_modal.push(this.state.modalDisplay[item])
      );

      showBackdropSaved = (
        <div>
          <Backdrop clicked={this.unshowBackdrop} />
          <Modal
            clicked={this.unshowBackdrop}
            message="Record Updated"
            longmessage="1"
            values_list={list_for_modal}
          />
        </div>
      );
    }

    return (
      <div>
        {showBackdropSaved}
        <main style={{ marginTop: '100px' }}>
          <form onSubmit={this.saveRecordtoDB} id="textalign">
            <div id="textalign">
              <p>Date</p>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                disabled
              />
            </div>
            <p style={{ marginTop: '50px' }}></p>

            <RecordInputSpent
              label="Bills"
              changed={this.valuePlannedChangedBill}
              value={this.state.bill_value}
            />
            <div className={bill_color}>{bill_message}</div>
            <div className={bill_color2}>{bill_message2}</div>

            <RecordInputSpent
              hasbeentoggled={this.state.toggled_bill_value}
              label="Bills Label"
              changed={this.labelPlannedChangedBill}
              value={this.state.bill_label}
            />
            <RecordInputSpent
              label="Food"
              changed={this.valuePlannedChangedFood}
              value={this.state.food_value}
            />
            <div className={food_color}>{food_message}</div>
            <div className={food_color2}>{food_message2}</div>

            <RecordInputSpent
              hasbeentoggled={this.state.toggled_food_value}
              label="Food Label"
              changed={this.labelPlannedChangedFood}
              value={this.state.food_label}
            />
            <RecordInputSpent
              label="Transportation"
              changed={this.valuePlannedChangedTr}
              value={this.state.tr_value}
            />
            <div className={tr_color}>{tr_message}</div>
            <div className={tr_color2}>{tr_message2}</div>

            <RecordInputSpent
              hasbeentoggled={this.state.toggled_tr_value}
              label="Transportation Label"
              changed={this.labelPlannedChangedTr}
              value={this.state.tr_label}
            />
            <RecordInputSpent
              label="Leisure"
              changed={this.valuePlannedChangedLeisure}
              value={this.state.leisure_value}
            />
            <div className={leisure_color}>{leisure_message}</div>
            <div className={leisure_color2}>{leisure_message2}</div>

            <RecordInputSpent
              hasbeentoggled={this.state.toggled_leisure_value}
              label="Leisure Label"
              changed={this.labelPlannedChangedleisure}
              value={this.state.leisure_label}
            />

            <p style={{ marginTop: '40px' }}></p>
            <button type="Submit">Save</button>
          </form>
        </main>
      </div>
    );
  }
}

export default RecordMainPage;
