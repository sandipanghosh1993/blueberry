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
      type: Number,
      require: true,
    },
    longitude: {
      type: Number,
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
