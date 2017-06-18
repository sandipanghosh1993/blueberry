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
    type: String
  },
  startTime: {
    type: String
  },
  startLocation: [{
    latitude: String
  },
  {
    longitude: String
  }],
  timeElapsed: {
    type: String
  },
  pinkCar: {
    type: Boolean,
    require: true
  }
});

module.exports = {Trip};
