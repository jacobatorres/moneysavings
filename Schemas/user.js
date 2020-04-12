var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

UserSchema.plugin(passportLocalMongoose);

// UserSchema.methods.generateHash = function (password) {
//   return bcrypt.hashSync(passwprd, bcrypt.genSaltSync(8), null);
// };

// UserSchema.methods.validPassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('User', UserSchema);
