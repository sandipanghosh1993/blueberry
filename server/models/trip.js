const c = 100;
const mongoose = require('mongoose');

var Trip = mongoose.model('Trip', {
  tripId: {
    type: String,
    require: true,
    unique: true
  },
  driverId: {
    type: String,
    require: true,
    unique: true
  },
  userId: {
    type: String,
    require: true,
    unique: true
  },
  dist: {
    type: Number
  },
  startTime: {
    type: String
  },
  startLocation: [{
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  }],
  timeElapsed: {
    type: Number
  },
  pinkCar: {
    type: Boolean,
    require: true
  }
});

module.exports = {Trip};
