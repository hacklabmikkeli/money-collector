var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebook_id : String,
  token : String,
  email : String,
  name : String,
  money : Number
});

module.exports = mongoose.model('User', userSchema);