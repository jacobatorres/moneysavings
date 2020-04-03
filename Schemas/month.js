const mongoose = require('mongoose');

const monthSchema = new mongoose.Schema({
  total_bill: Number,
  total_food: Number,
  total_tr: Number,
  total_leisure: Number,
  month_number: Number,
  year_number: Number,
  timestamp: Date,

  user_parent: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
});

console.log('This is at MOnth Schema');

module.exports = mongoose.model('Month', monthSchema);
