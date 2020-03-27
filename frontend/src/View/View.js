import React, { Component } from 'react';
import axios from 'axios';
import './View.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/modal';

class View extends Component {
  state = {
    month_record: {
      bills: 0,
      food: 0,
      transportation: 0,
      leisure: 0
    },
    running_totals: {
      bill: 0,
      food: 0,
      transportation: 0,
      leisure: 0
    },

    day_by_day: {
      bills_list_value: [],
      food_list_value: [],
      transportation_list_value: [],
      leisure_list_value: [],

      bills_list_label: [],
      food_list_label: [],
      transportation_list_label: [],
      leisure_list_label: []
    },

    id_list: {
      bills: [],
      food: [],
      transportation: [],
      leisure: []
    },

    doesMonthPlanExiststate: false,
    clickDelete: false,

    value_to_delete: {
      bill_value: 0,
      bill_label: '',
      food_value: 0,
      food_label: '',
      tr_value: 0,
      tr_label: '',
      leisure_value: 0,
      leisure_label: '',
      startDate: new Date()
    }
  };

  ConcatLabelValue(list1, list2, list_ids) {
    // this is gonna return be a list of lists
    // [[label, id],[label, id]]
    let list3 = [];

    list1.map(function(key, index) {
      let templist = [];
      templist.push(list1[index] + '  (' + list2[index] + ')');
      templist.push(list_ids[index]);
      list3.push(templist);
    });

    return list3;
  }

  determineColor(running_total, limit, defaultval) {
    if (defaultval == 0) {
      return 'blue';
    }
    if (running_total <= limit) {
      return 'green';
    } else {
      return 'red';
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);
    axios
      .get(axios_url + '/getMonthPlan')
      .then(response => {
        console.log('I got the month');
        console.log(response);

        // get the bill, food, transportation, leisure

        if (response.data == null) {
          this.setState({ doesMonthPlanExiststate: false });
        } else {
          this.setState({ doesMonthPlanExiststate: true });

          this.setState({
            month_record: {
              bills: parseFloat(response.data.total_bill),
              food: parseFloat(response.data.total_food),
              transportation: parseFloat(response.data.total_tr),
              leisure: parseFloat(response.data.total_leisure)
            }
          });
          console.log(this.state);
        }

        // once you get the totals, then get the day records
        let axios_url = 'https://moneysavings.herokuapp.com';
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'development') {
          axios_url = 'http://localhost:3001';
        }
        console.log(axios_url);

        axios
          .get(axios_url + '/getAllFourCurrentTotal')
          .then(response => {
            console.log('I got the all four!!!');
            console.log(response);

            // get the running total for bill, food, transportation, leisure

            let running_totals = {
              bill: 0,
              food: 0,
              transportation: 0,
              leisure: 0
            };

            let day_by_day = {
              bills_list_value: [],
              food_list_value: [],
              transportation_list_value: [],
              leisure_list_value: [],

              bills_list_label: [],
              food_list_label: [],
              transportation_list_label: [],
              leisure_list_label: []
            };

            let id_list = {
              bills: [],
              food: [],
              transportation: [],
              leisure: []
            };

            Object.keys(response.data).map(function(key, index) {
              running_totals.bill += response.data[key].bill_value;
              running_totals.food += response.data[key].food_value;
              running_totals.transportation += response.data[key].tr_value;
              running_totals.leisure += response.data[key].leisure_value;

              if (parseFloat(response.data[key].bill_value) != 0) {
                day_by_day.bills_list_label.push(response.data[key].bill_label);

                day_by_day.bills_list_value.push(
                  parseFloat(response.data[key].bill_value)
                );

                id_list.bills.push(response.data[key]._id);
              }

              if (parseFloat(response.data[key].food_value) != 0) {
                day_by_day.food_list_label.push(response.data[key].food_label);

                day_by_day.food_list_value.push(
                  parseFloat(response.data[key].food_value)
                );

                id_list.food.push(response.data[key]._id);
              }

              if (parseFloat(response.data[key].tr_value) != 0) {
                day_by_day.transportation_list_label.push(
                  response.data[key].tr_label
                );

                day_by_day.transportation_list_value.push(
                  parseFloat(response.data[key].tr_value)
                );
                id_list.transportation.push(response.data[key]._id);
              }

              if (parseFloat(response.data[key].leisure_value) != 0) {
                day_by_day.leisure_list_label.push(
                  response.data[key].leisure_label
                );

                day_by_day.leisure_list_value.push(
                  parseFloat(response.data[key].leisure_value)
                );
                id_list.leisure.push(response.data[key]._id);
              }
            });

            this.state.running_totals = running_totals;
            this.state.day_by_day = day_by_day;
            this.state.id_list = id_list;

            console.log(this.state);
            console.log('watch:');
            console.log(this.state.day_by_day);
            // get the day-by-day here
          })
          .catch(error => {
            console.log('nagkamali sa running totals');
            console.log(error.response);
          });
      })
      .catch(error => {
        console.log('nagkamali sa get month');
        console.log(error.response);
      });
  }

  getMonthIndex = () => {
    return new Date().getMonth();
  };

  getYear = () => {
    return new Date().getFullYear();
  };

  unshowBackdrop = () => {
    this.setState({ clickDelete: false });
  };

  deleteRecord = value_id => {
    console.log(value_id);
    console.log('WAWIJAWDLKAWW');
    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);

    axios
      .get(axios_url + '/getDay?' + 'id=' + value_id)
      .then(response => {
        console.log('iv of speads');
        this.setState({
          value_to_delete: {
            bill_value: response.data.bill_value,
            bill_label: response.data.bill_label,
            food_value: response.data.food_value,
            food_label: response.data.food_label,
            tr_value: response.data.tr_value,
            tr_label: response.data.tr_label,
            leisure_value: response.data.leisure_value,
            leisure_label: response.data.leisure_label,
            startDate: Date.parse(response.data.timestamp)
          },
          clickDelete: true
        });
      })
      .catch(error => {
        console.log('nagkamali sa running totals');
        console.log(error.response);
      });
  };

  render() {
    let big_4_data = {
      bill_values: [],
      food_values: [],
      tr_values: [],
      leisure_values: []
    };

    // bill
    let bill_name =
      this.state.running_totals.bill == 0
        ? 'Bill'
        : 'Bill ' +
          this.state.month_record.bills +
          ' (Currently ' +
          this.state.running_totals.bill +
          ')';

    let itemsval_bill = this.ConcatLabelValue(
      this.state.day_by_day.bills_list_label,
      this.state.day_by_day.bills_list_value,
      this.state.id_list.bills
    );
    let colorsval_bill =
      this.state.running_totals.bill <= this.state.month_record.bills
        ? 'btn good'
        : 'btn bad';

    big_4_data.bill_values.push('bill_id');
    big_4_data.bill_values.push(bill_name);
    big_4_data.bill_values.push(itemsval_bill);
    big_4_data.bill_values.push(colorsval_bill);

    // food
    let food_name =
      this.state.running_totals.food == 0
        ? 'Food'
        : 'Food ' +
          this.state.month_record.food +
          ' (Currently ' +
          this.state.running_totals.food +
          ')';

    let itemsval_food = this.ConcatLabelValue(
      this.state.day_by_day.food_list_label,
      this.state.day_by_day.food_list_value,
      this.state.id_list.food
    );
    let colorsval_food =
      this.state.running_totals.food <= this.state.month_record.food
        ? 'btn good'
        : 'btn bad';

    big_4_data.food_values.push('food_id');
    big_4_data.food_values.push(food_name);
    big_4_data.food_values.push(itemsval_food);
    big_4_data.food_values.push(colorsval_food);

    // transportation
    let tr_name =
      this.state.running_totals.transportation == 0
        ? 'Transportation'
        : 'Transportation' +
          this.state.month_record.transportation +
          ' (Currently ' +
          this.state.running_totals.transportation +
          ')';

    let itemsval_tr = this.ConcatLabelValue(
      this.state.day_by_day.transportation_list_label,
      this.state.day_by_day.transportation_list_value,
      this.state.id_list.transportation
    );
    let colorsval_tr =
      this.state.running_totals.transportation <=
      this.state.month_record.transportation
        ? 'btn good'
        : 'btn bad';

    big_4_data.tr_values.push('tr_id');
    big_4_data.tr_values.push(tr_name);
    big_4_data.tr_values.push(itemsval_tr);
    big_4_data.tr_values.push(colorsval_tr);

    // leisure
    let leisure_name =
      this.state.running_totals.leisure == 0
        ? 'Leisure'
        : 'Leisure' +
          this.state.month_record.leisure +
          ' (Currently ' +
          this.state.running_totals.leisure +
          ')';

    let itemsval_leisure = this.ConcatLabelValue(
      this.state.day_by_day.leisure_list_label,
      this.state.day_by_day.leisure_list_value,
      this.state.id_list.leisure
    );
    let colorsval_leisure =
      this.state.running_totals.leisure <= this.state.month_record.leisure
        ? 'btn good'
        : 'btn bad';

    big_4_data.leisure_values.push('leisure_id');
    big_4_data.leisure_values.push(leisure_name);
    big_4_data.leisure_values.push(itemsval_leisure);
    big_4_data.leisure_values.push(colorsval_leisure);

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
      'December'
    ];
    let month_index = this.getMonthIndex();

    let month_result = months[month_index];

    let year_result = this.getYear();

    console.log(big_4_data);
    console.log('HE RRRRR');

    let showBackdropSaved = null;

    let message_modal = 'where are you\n and im so sorry\n i cannot sleep';

    let list_for_modal = [];
    Object.keys(this.state.value_to_delete).map(item =>
      list_for_modal.push(this.state.value_to_delete[item])
    );

    if (this.state.clickDelete) {
      showBackdropSaved = (
        <div>
          <Backdrop clicked={this.unshowBackdrop} />
          <Modal
            clicked={this.unshowBackdrop}
            lis
            message={message_modal}
            longmessage="1"
            values_list={list_for_modal}
          />
        </div>
      );
    }

    return (
      <div>
        {showBackdropSaved}
        {this.state.doesMonthPlanExiststate ? (
          <div className="middle">
            <div className="menu">
              {Object.keys(big_4_data).map((key, index) => (
                <li className="item" id={big_4_data[key][0]}>
                  <a
                    href={'#' + big_4_data[key][0]}
                    className={big_4_data[key][3]}
                  >
                    {big_4_data[key][1]}
                  </a>
                  <div className="smenu">
                    {big_4_data[key][2].length == 0 ? (
                      <div></div>
                    ) : (
                      big_4_data[key][2].map(i => (
                        <ul>
                          <li className="alignleft">{i[0]}</li>
                          <li className="alignright">
                            <Link
                              to={{
                                pathname: '/editrecord',
                                day_id: i[1]
                              }}
                            >
                              <a className="link_color">edit</a>
                            </Link>{' '}
                            |{' '}
                            <p
                              style={{ display: 'inline', cursor: 'pointer' }}
                              onClick={() => this.deleteRecord(i[1])}
                            >
                              <a className="link_color">delete</a>
                            </p>
                          </li>
                        </ul>
                      ))
                    )}
                  </div>
                </li>
              ))}
            </div>
          </div>
        ) : (
          <div id="textalign">
            No plan yet for {month_result} {year_result}
            <br />
            <a href="/plan">Make a plan now! </a>{' '}
          </div>
        )}
      </div>
    );
  }
}

export default View;
