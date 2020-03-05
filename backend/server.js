const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const Record = require('./Schemas/record');
const Day = require('./Schemas/day');

const API_PORT = 3001;
app = express();
app.use(bodyparser.json());

app.use(cors());
const dbRoute =
  'mongodb+srv://jacob:YySvDqpXIKqWLPBA@cluster0-zs4uc.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/sayHi', (req, res) => {
  res.send('hey!');
});

app.post('/saveRecord', (req, res) => {
  console.log(req.body);
  console.log('testing here');
  const day_data = {
    bill_value: parseFloat(req.body.bill_value),
    bill_label: 'billlabel',
    food_value: parseFloat(req.body.food_value),
    food_label: 'billlabel',
    tr_value: parseFloat(req.body.tr_value),
    tr_label: 'billlabel',
    leisure_value: parseFloat(req.body.leisure_value),
    leisure_label: 'billlabel',
    timestamp: req.body.timestamp
  };

  // save the Record
  Day.create(day_data, function(err, newRecord) {
    if (err) {
      console.log(err);
    } else {
      console.log(newRecord);
      // res.redirect('/');
    }
  });
});

app.listen(API_PORT, () => console.log(`LISTENING ON UHH PORT ${API_PORT}`));
