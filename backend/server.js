const mongoose = require('mongoose');
const express = require('express');

const Record = require('./Schemas/record');
const API_PORT = 3001;
app = express();

const dbRoute =
  'mongodb+srv://jacob:YySvDqpXIKqWLPBA@cluster0-zs4uc.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(API_PORT, () => console.log(`LISTENING ON UHH PORT ${API_PORT}`));
