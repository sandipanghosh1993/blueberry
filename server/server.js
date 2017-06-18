require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const geodist = require('geodist')
const uuidv4 = require('uuid/v4');

var {mongoose} = require('./db/mongoose');
var {Car} = require('./models/car');
var {User} = require('./models/user');
var {Trip} = require('./models/trip');


var app=express();
var port = process.env.PORT;

app.use(bodyParser.json());


app.post('/requestCar', (req, res) => {

  var userId = req.body.userId;
  var lat = req.body.latitude;
  var lon = req.body.longitude;
  var isPink = req.body.isPink;
  var dist = 0;
  var bookedCar={};
  var location ={latitude: lat, longitude: lon};

  Car.find({isBooked: false, isPink: isPink, isBooked: false}).then((cars) => {
    if(!cars) {
      return res.status(400).send('No cars are available.');
    }

    cars.forEach(function(car) {
      var diff = geodist(car.location, {lat, lon});
      if(dist>diff) {
        dist = diff;
        bookedCar = car;
      }
	   });
  }).catch((e) => {
    return res.status(400).send('Error occurred during booking.');
  });

  var tripId = uuidv4();

  var trip = new Trip({
    tripId,
    driverId: bookedCar.driverId,
    userId,
    startTime: (new Date()).toString(),
    startLocation: location,
    pinkCar: isPink
  });

  trip.save().then((doc) => {
    console.log(doc);
  }, (e) => {
    //res.status(400).send(e);
    console.log(e);
  });

  var message = [{
    success: true,
    driverId: bookedCar.driverId,
    distance: dist,
    tripId
  }];

  res.status(200).send(message);

});

app.put('/startTrip/:tripId', (req, res) => {

  var tripId = req.params.tripId;

  Trip.find({tripId: tripId}).then((trip) => {
    return res.status(200).send({sucess: true});
  }, (e) => {
    return res.status(200).send({sucess: false, errorMessage: 'TripId not found'});
  });
});

app.put('/stopTrip/:tripId/:latitude/:longitude', (req, res) => {
  var tripId = req.params.tripId;
  var lat = req.params.latitude;
  var lon = req.params.longitude;

  Trip.find({tripId: tripId}).then((trip) => {
    if(!trip) {
      return res.status(400).send('TripID not found. Unable to end the trip.');
    }

    var distance = geodist({lat, lon}, trip.startLocation);
    var timeElapsed = (new Date(trip.startTime).getMinutes()) - (new Date().getMinutes());
    var pinkCharge = 0;
    if(trip.pinkCar) {
      pinkCharge = 20;
    }

    var tripFare = distance+timeElapsed+pinkCharge;

    var message = {
      sucess: true,
      distance: distance,
      timeElapsed: timeElapsed,
      pinkCharge: pinkCharge,
      tripFare: tripFare
    };

    return res.status(200).send(message);

  }, (e) => {
    return res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
