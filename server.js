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

const UserSession = require('./Schemas/usersession');

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
  // view
  // editrecord

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

app.post('/saveRecord', (req, res) => {
  // Record Component

  // get the corresponding month,
  // then save the Day. You will need the month ID.

  console.log('[/saveRecord] just entered. Req.body seen below:');
  console.log(req.body);
  const time_dmy = moment(
    req.body.timestamp,
    moment.HTML5_FMT.DATETIME_LOCAL_MS
  );

  const month = time_dmy.format('MM') - 1; // minus 1 because month is 0 based
  const day = time_dmy.format('DD') - 1; // minus 1 because for some reason it adds one.
  const year = time_dmy.format('YYYY');

  const username = req.body.username;
  console.log('user name is : ' + username);

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

  console.log('fetching Month');
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
        // got the month (at this point it should exist)

        console.log('fetched month properly in Else.');

        day_data.month_parent = {
          id: month._id,
          month_number: month_number_rn,
          year_number: year_number_rn,
        };

        // save the Record
        console.log('Saving day record...');
        Day.create(day_data, function (err, newRecord) {
          if (err) {
            console.log(err);
          } else {
            console.log(
              '[Day / savemonthPlan] Saved the record. Below is the new record. Exiting...'
            );
            console.log(newRecord);
            res.end('');
          }
        });
      }
    }
  );
});

app.get('/getDaysFromMonthPlan', (req, res) => {
  // Record
  // View
  // EditRecord

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

// given the ID, get the needed information
app.get('/getDay', function (req, res) {
  // EditRecord
  console.log('[/getDay] Here at get day.');

  Day.findById(req.query.id, function (err, day) {
    if (err) {
      console.log('Error in getting the day record');
    } else {
      // get the day
      console.log('I got the day record. Exiting...');
      res.end(JSON.stringify(day));
    }
  });
});

app.put('/updateDay', function (req, res) {
  // EditRecord component

  console.log('[UpdateDay] Updating record. This is for EditRecord component');

  let time_niceformat = moment(req.body.timestamp);
  console.log(time_niceformat.format('ll'));

  const day_data = {
    bill_value: parseFloat(req.body.bill_value),
    bill_label: req.body.bill_label,
    food_value: parseFloat(req.body.food_value),
    food_label: req.body.food_label,
    tr_value: parseFloat(req.body.tr_value),
    tr_label: req.body.tr_label,
    leisure_value: parseFloat(req.body.leisure_value),
    leisure_label: req.body.leisure_label,
    timestamp: time_niceformat,
  };

  console.log(req.body.id);

  Day.findByIdAndUpdate(req.body.id, day_data, function (err, updatedDay) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully updated day. Here is what it is:');
      console.log(updatedDay);
      res.end(JSON.stringify(updatedDay));
    }
  });
});

app.delete('/deleteRecord', function (req, res) {
  // View - deleteRecord function

  console.log('Deleting record...This is the ID to delete:');
  console.log(req.query.id);

  Day.deleteOne({ _id: req.query.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Record has been deleted.');
      res.end('');
    }
  });
});

app.delete('/deleteCurrentMonth', function (req, res) {
  //  remove all days and remove all months (probably only one record),

  console.log('[/deleteCurrentMonth] Here at delete');

  console.log('Username is ' + req.query.username);

  // Get the user
  // then get the month, then delete all days from the month

  const username = req.query.username;
  const month_number_rn = parseFloat(new Date().getMonth() + 1);
  const year_number_rn = parseFloat(new Date().getFullYear());
  console.log(username);
  console.log(month_number_rn);
  console.log(year_number_rn);

  // check the existense of month-plan given the two arguments
  // also include user of course

  console.log('Search for the current month plan of the logged in user');
  Month.findOneAndDelete(
    {
      month_number: month_number_rn,
      year_number: year_number_rn,
      'user_parent.username': username,
    },
    function (err, monthDeleted) {
      if (err) {
        console.log(err);
      } else {
        // if there's no current month, handle it
        // else, delete the corresponding day records
        if (monthDeleted == null) {
          // no record found, return blank
          console.log('found no month. returning...');
          res.end(JSON.stringify(monthDeleted));
        } else {
          console.log(
            'found month and deleted it. Finding all days corresponding...'
          );
          let month_id = monthDeleted._id;
          Day.deleteMany({ 'month_parent.id': month_id }, function (
            err,
            result
          ) {
            if (err) {
              console.log('something went wrong with deleting the day records');
            } else {
              // successfully deleted day records.
              console.log(
                "Deleted all day records for this user's current month plan. exiting..."
              );
              res.end('');
            }
          });
        }
      }
    }
  );

  // old way
  // Day.deleteMany({}, function (err, result) {
  //   if (err) {
  //     console.log('something wrong with deleting the days');
  //     res.end('');
  //   } else {
  //     // then remove months
  //     Month.deleteMany({}, function (err, result) {
  //       if (err) {
  //         console.log('wrong with months');
  //         res.end('');
  //       } else {
  //         console.log('returning...');
  //         res.end('');
  //       }
  //     });
  //   }
  // });
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

  // we know it's a valid

  // find the user ID first, use that as token

  User.find({ username: req.body.username }, function (err, foundUser) {
    if (err) {
      console.log('error on finding user');
      // this should never happen because we have the middleware
    } else {
      // found user, returning the token / user iD
      console.log(foundUser);
      return res.end(JSON.stringify(foundUser[0]));
    }
  });
});

app.get('/getUserName', function (req, res) {
  let userID = req.query.id;
  console.log('[/getUsername] here at get username');
  User.findById(userID, function (err, founduser) {
    if (err) {
      console.log('error in finding by id');
    } else {
      // found ID

      res.send(JSON.stringify(founduser));
    }
  });
});

app.get('/checkUserSession', function (req, res) {
  let username = req.query.username;

  console.log('[/checkuserSession] for token validation');
  // check if the token is the one currently logged in
  User.find({ username: username }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('no err');

      UserSession.find({ userId: foundUser._id, isDeleted: false }, function (
        err,
        foundusersession
      ) {
        console.log('Searched Usersession.');
        console.log(foundusersession);

        if (foundusersession.length == 0) {
          // no user session found. so, save a user session
          console.log('no Usersession found.');

          console.log('Successful user session ');
          return res.end(
            JSON.stringify({
              message: 'No user session.',
            })
          );
        } else {
          // user session found.
          res.end(
            JSON.stringify({
              message: 'Found user session. This user is logged in',
            })
          );
          // this user is already logged in
        }
      });
    }
  });
});

// log out

app.get('/logout', function (req, res) {
  console.log('[/logout] logged out');
  let username = req.query.username;

  req.logout();

  return res.end(JSON.stringify({ result: 'logged out' }));
  // // also remove the user session id
  // User.find({ user: username }, function (err, foundUser) {
  //   if (err) {
  //     console.log('Something wrong with finding user');
  //   } else {
  //     // it should exist

  //     let userId = foundUser._id;

  //     // now we remove the user session
  //     UserSession.findOneAndDelete({ userId: userId }, function (
  //       err,
  //       usersessiondeleted
  //     ) {
  //       if (err) {
  //         console.log('error in deleting find one and update');
  //       } else {
  //       }
  //     });
  //   }
  // });
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
    console.log('grr');
    console.log(path.join(__dirname, 'frontend', 'build', 'index.html'));
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// app.get('*', function (req, res) {
//   console.log('boomies');
//   res.sendFile(path.join(__dirname, 'index.html'), function (err) {
//     if (err) {
//       res.state(500).send(err);
//     }
//   });
// });

app.listen(API_PORT, () => console.log(`LISTENING ON UHH PORT ${API_PORT}`));
