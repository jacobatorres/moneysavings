const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  plannedValue: Number,
  spentValue: Number
});

console.log('im at record js');

module.exports = mongoose.model('Record', recordSchema);
