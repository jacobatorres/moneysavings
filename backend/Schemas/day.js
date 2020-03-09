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
  timestamp: Date,

  month_parent: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Month'
    },
    month_number: Number,
    year_number: Number
  }
});

console.log('This is at Day Schema');

module.exports = mongoose.model('Day', daySchema);
