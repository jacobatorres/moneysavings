require('dotenv').config();
const Day = require('./Schemas/day');
const Month = require('./Schemas/month');

const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');

const moment = require('moment');
const path = require('path');

const cors = require('cors');

// for auth
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./Schemas/user');

let API_PORT = process.env.PORT || 3001;
app = express();
app.use(bodyparser.json());

app.use(cors());

// passport configuration for auth
app.use(
  require('express-session')({
    secret: 'sikreto-para-sa-auth',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const dbRoute =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/moneysavingsapp';

console.log(dbRoute);
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('aaa1');

app.get('/sayHi', (req, res) => {
  res.send('hey!');
});
console.log('aaa2');

app.get('/getMonthPlan', (req, res) => {
  // plan
  // record

  console.log('[/getmonthplan] I made it here entered /getmonthplan');

  const username = req.query.username;
  const month_number_rn = parseFloat(new Date().getMonth() + 1);
  const year_number_rn = parseFloat(new Date().getFullYear());
  console.log(username);
  console.log(month_number_rn);
  console.log(year_number_rn);

  // check the existense of month-plan given the two arguments
  // also include user of course

  Month.findOne(
    {
      month_number: month_number_rn,
      year_number: year_number_rn,
      'user_parent.username': username,
    },
    function (err, month) {
      if (err) {
        console.log(err);
      } else {
        console.log('[/getmonthplan] success in else. exiting');
        console.log(month);
        res.end(JSON.stringify(month));
      }
    }
  );
});

app.post('/saveRecord', (req, res) => {
  console.log('i have entered here');
  console.log(req.body);
  const time_dmy = moment(
    req.body.timestamp,
    moment.HTML5_FMT.DATETIME_LOCAL_MS
  );

  const month = time_dmy.format('MM') - 1; // minus 1 because month is 0 based
  const day = time_dmy.format('DD') - 1; // minus 1 because for some reason it adds one.
  const year = time_dmy.format('YYYY');

  const day_data = {
    bill_value: parseFloat(req.body.bill_value),
    bill_label: req.body.bill_label,
    food_value: parseFloat(req.body.food_value),
    food_label: req.body.food_label,
    tr_value: parseFloat(req.body.tr_value),
    tr_label: req.body.tr_label,
    leisure_value: parseFloat(req.body.leisure_value),
    leisure_label: req.body.leisure_label,
    timestamp: new Date(year, month, day),
  };

  // get the correct month where this is from, and save it using that id
  const month_number_rn = parseFloat(new Date().getMonth() + 1);
  const year_number_rn = parseFloat(new Date().getFullYear());

  Month.findOne(
    { month_number: month_number_rn, year_number: year_number_rn },
    function (err, month) {
      if (err) {
        console.log(err);
      } else {
        // success -- we got the correct month

        day_data.month_parent = {
          id: month._id,
          month_number: month_number_rn,
          year_number: year_number_rn,
        };

        console.log('wagi');
        console.log(month);
        console.log(day_data);

        // save the Record
        Day.create(day_data, function (err, newRecord) {
          if (err) {
            console.log(err);
          } else {
            console.log('saved properly');
            console.log(newRecord);
            res.end('');
          }
        });
      }
    }
  );
});

app.post('/saveMonthPlan', (req, res) => {
  // plan

  // save the month info (4) from the user

  console.log('[/save month plan] starting to save');
  console.log(req.body);

  const username_of_loggedin = req.body.username;
  console.log('username' + username_of_loggedin);

  const time_dmy = moment(
    req.body.timestamp,
    moment.HTML5_FMT.DATETIME_LOCAL_MS
  );

  const month = time_dmy.format('MM') - 1;
  const day = time_dmy.format('DD');
  const year = time_dmy.format('YYYY');

  const month_data = {
    total_bill: parseFloat(req.body.total_bill),
    total_food: parseFloat(req.body.total_food),
    total_tr: parseFloat(req.body.total_tr),
    total_leisure: parseFloat(req.body.total_leisure),
    month_number: parseFloat(req.body.month_number) + 1,
    year_number: parseFloat(req.body.year_number),
    timestamp: new Date(year, month, day),
  };

  // get the user
  // save the month

  User.findOne({ username: username_of_loggedin }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      // user found
      console.log('[User] successfully entered else');
      console.log('found user: ');
      console.log(foundUser);
      if (foundUser == null) {
        res.end(JSON.stringify(foundUser));
      }
      month_data.user_parent = {
        id: foundUser._id,
        username: username_of_loggedin,
      };

      console.log('month data:');
      console.log(month_data);

      // save the Record
      Month.create(month_data, function (err, newMonth) {
        if (err) {
          console.log(err);
        } else {
          console.log('[save month plan] else saved properly (month). exiting');
          console.log(newMonth);
          res.end(JSON.stringify(newMonth));
        }
      });
    }
  });
});

app.delete('/deleteAll', function (req, res) {
  //  remove all days and remove all months (probably only one record),
  console.log('entered here');
  Day.deleteMany({}, function (err, result) {
    if (err) {
      console.log('something wrong with deleting the days');
      res.end('');
    } else {
      // then remove months
      Month.deleteMany({}, function (err, result) {
        if (err) {
          console.log('wrong with months');
          res.end('');
        } else {
          console.log('returning...');
          res.end('');
        }
      });
    }
  });
});

// given the ID, get the needed information
app.get('/getDay', function (req, res) {
  console.log('whos that girl?');

  Day.findById(req.query.id, function (err, day) {
    if (err) {
      console.log('something wrong with day');
    } else {
      // get the day
      res.end(JSON.stringify(day));
    }
  });
});

app.put('/updateDay', function (req, res) {
  console.log('PUTTTTa');
  console.log(req.body.timestamp);
  let d4 = moment(req.body.timestamp);
  console.log(d4.format('ll'));

  const day_data = {
    bill_value: parseFloat(req.body.bill_value),
    bill_label: req.body.bill_label,
    food_value: parseFloat(req.body.food_value),
    food_label: req.body.food_label,
    tr_value: parseFloat(req.body.tr_value),
    tr_label: req.body.tr_label,
    leisure_value: parseFloat(req.body.leisure_value),
    leisure_label: req.body.leisure_label,
    timestamp: d4,
  };

  console.log(req.body.id);

  Day.findByIdAndUpdate(req.body.id, day_data, function (err, updatedDay) {
    if (err) {
      console.log(err);
    } else {
      console.log('yes fm!');
      console.log(updatedDay);
      res.end(JSON.stringify(updatedDay));
    }
  });
});

app.delete('/deleteRecord', function (req, res) {
  Day.deleteOne({ _id: req.query.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('gonee');
      res.end('');
    }
  });
});

app.get('/getDaysFromMonthPlan', (req, res) => {
  // Record

  // get the month-plan (at this point, it should exist)
  // get the corresponding days from this month-plan

  console.log('[/getDaysFromMonthPlan] Just entered here');
  const month_number_rn = parseFloat(new Date().getMonth() + 1);
  const year_number_rn = parseFloat(new Date().getFullYear());
  const username = req.query.username;

  Month.findOne(
    {
      month_number: month_number_rn,
      year_number: year_number_rn,
      'user_parent.username': username,
    },
    function (err, month) {
      if (err) {
        console.log(err);
      } else {
        console.log('[Month] entered else of month. Heres what i found:');
        console.log(month);

        // given the found month-plan, check all corresponding day records

        if (month == null) {
          // no record found, return blank
          console.log('found no month. returning...');
          res.end(JSON.stringify(month));
        } else {
          console.log('found month. Finding all days corresponding');
          let month_id = month._id;

          Day.find({ 'month_parent.id': month_id }, function (err, allDays) {
            if (err) {
              console.log(err);
            } else {
              console.log('[Day] Found all days. exiting...');
              res.end(JSON.stringify(allDays));
            }
          });
        }
      }
    }
  );
});

app.get('/getDaysfromUsersMP', function (req, res) {
  // get month
  const month_number_rn = parseFloat(new Date().getMonth() + 1);
  const year_number_rn = parseFloat(new Date().getFullYear());

  const username = req.query.username;
  Month.findOne(
    {
      month_number: month_number_rn,
      year_number: year_number_rn,
      'user_parent.username': username,
    },
    function (err, month) {
      if (month == null) {
        // no record found, return blank
        res.end(JSON.stringify(month));
      } else {
        let month_id = month._id;

        Day.find({ 'month_parent.id': month_id }, function (
          err,
          allDaysforUser
        ) {
          if (err) {
            console.log(err);
          } else {
            console.log('got tem!!!');
            res.end(JSON.stringify(allDaysforUser));
          }
        });
      }
    }
  );
});

// for auth

// show register

app.post('/printregister', function (req, res) {
  let newUser = new User({ username: req.body.username });

  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.end(JSON.stringify({ error: 'UserExistsError' }));
    } else {
      passport.authenticate('local')(req, res, function () {
        return res.end(JSON.stringify(user));
      });
    }
  });
});

// show login form
app.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('[/login] logged in');
  console.log(req.body);
  return res.end(JSON.stringify(req.body));
});

// log out

app.get('/logout', function (req, res) {
  console.log('[/logout] logged out');

  req.logout();
  return res.end(JSON.stringify({ result: 'logged out' }));
});

// this may be used for logging in
// POST requests
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return 'Unauthorized';
}

// step 3 from https://www.youtube.com/watch?v=e1LaekAnVIM&t=579s
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  console.log('i am hereee');
  console.log(__dirname);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(API_PORT, () => console.log(`LISTENING ON UHH PORT ${API_PORT}`));
