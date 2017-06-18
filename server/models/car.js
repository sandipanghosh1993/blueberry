const mongoose = require('mongoose');

var Car = mongoose.model('Car', {
  carId: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  driverId: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  location: [{
    latitude: {
      type: String,
      require: true,
    },
    longitude: {
      type: String,
      require: true,
    }
  }],
  isPink: {
    type: Boolean
  },
  isBooked: {
    type: Boolean
  }
});

module.exports = {Car};
