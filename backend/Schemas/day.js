const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  bill_value: Number,
  bill_label: String,
  food_value: Number,
  food_label: String,
  tr_value: Number,
  tr_label: String,
  leisure_value: Number,
  leisure_label: String,
  timestamp: Date
});

console.log('This is at Day Schema');

module.exports = mongoose.model('Day', daySchema);
