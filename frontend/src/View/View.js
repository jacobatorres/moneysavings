import React, { Component } from 'react';
import axios from 'axios';
import ViewLi from './ViewLi';
import './View.css';

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
    }
  };

  ConcatLabelValue(list1, list2) {
    let list3 = [];

    list1.map(function(key, index) {
      list3.push(list1[index] + '  (' + list2[index] + ')');
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
    let axios_url = 'https://moneysavings.herokuapp.com';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      axios_url = 'http://localhost:3001';
    }
    console.log(axios_url);
    axios
      .get('http://localhost:3001/getMonthPlan')
      .then(response => {
        console.log('I got the month');
        console.log(response);

        // as of now I am sure that the data exists...

        // get the bill, food, transportation, leisure

        this.setState({
          month_record: {
            bills: parseFloat(response.data.total_bill),
            food: parseFloat(response.data.total_food),
            transportation: parseFloat(response.data.total_tr),
            leisure: parseFloat(response.data.total_leisure)
          }
        });
        console.log(this.state);

        // once you get the totals, then get the day records
        let axios_url = 'https://moneysavings.herokuapp.com';
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'development') {
          axios_url = 'http://localhost:3001';
        }
        console.log(axios_url);

        axios
          .get('http://localhost:3001/getAllFourCurrentTotal')
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
              }

              if (parseFloat(response.data[key].food_value) != 0) {
                day_by_day.food_list_label.push(response.data[key].food_label);

                day_by_day.food_list_value.push(
                  parseFloat(response.data[key].food_value)
                );
              }

              if (parseFloat(response.data[key].tr_value) != 0) {
                day_by_day.transportation_list_label.push(
                  response.data[key].tr_label
                );

                day_by_day.transportation_list_value.push(
                  parseFloat(response.data[key].tr_value)
                );
              }

              if (parseFloat(response.data[key].leisure_value) != 0) {
                day_by_day.leisure_list_label.push(
                  response.data[key].leisure_label
                );

                day_by_day.leisure_list_value.push(
                  parseFloat(response.data[key].leisure_value)
                );
              }
            });

            this.state.running_totals = running_totals;
            this.state.day_by_day = day_by_day;

            console.log(this.state);

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

  render() {
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
      this.state.day_by_day.bills_list_value
    );
    let colorsval_bill =
      this.state.running_totals.bill <= this.state.month_record.bills
        ? 'green'
        : 'red';

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
      this.state.day_by_day.food_list_value
    );
    let colorsval_food =
      this.state.running_totals.food <= this.state.month_record.food
        ? 'green'
        : 'red';

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
      this.state.day_by_day.transportation_list_value
    );
    let colorsval_tr =
      this.state.running_totals.transportation <=
      this.state.month_record.transportation
        ? 'green'
        : 'red';

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
      this.state.day_by_day.leisure_list_value
    );
    let colorsval_leisure =
      this.state.running_totals.leisure <= this.state.month_record.leisure
        ? 'green'
        : 'red';

    return (
      <div className="middle">
        <div className="menu">
          <ViewLi
            idval="bill_id"
            name={bill_name}
            itemsval={itemsval_bill}
            colorsval={colorsval_bill}
          />

          <ViewLi
            idval="food_id"
            name={food_name}
            itemsval={itemsval_food}
            colorsval={colorsval_food}
          />

          <ViewLi
            idval="tr_id"
            name={tr_name}
            itemsval={itemsval_tr}
            colorsval={colorsval_tr}
          />

          <ViewLi
            idval="leisure_id"
            name={leisure_name}
            itemsval={itemsval_leisure}
            colorsval={colorsval_leisure}
          />
        </div>
      </div>
    );
  }
}

export default View;
