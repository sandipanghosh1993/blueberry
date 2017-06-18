const mongoose = require('mongoose');

var User = mongoose.model('User', {
  userId: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  phoneNo: {
    type: Number,
    require: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    require: true,
    trim: true
  }
});

module.exports = {User};
