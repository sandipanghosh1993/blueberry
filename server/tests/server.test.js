const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {Trip} = require('./../models/trip');

describe('POST /requestCar', () => {

  var testObj = {
    userdId: 123,
    latitude: 41.85,
    longitude: -87.65,
    isPink: true
  };

  it('should get request', (done) => {
    request(app)
      .post('/requestCar')
      .send(testObj)
      .expect(200)
      .end(done);
  });
});

describe('PUT /startTrip/:tripId', () => {

  let trip = new Trip({
    tripId: 't123',
    driverId: 'b123',
    userId: 'u123',
    isPink: true
  });

  it('should start trip', (done) => {
    request(app)
      .put(`/startTrip/${trip.tripId}`)
      .send(trip)
      .expect(200)
      .end(done);
  });
});

describe('PUT /stopTrip/:tripId/:latitude/:longitude', () => {

  let trip = new Trip({
    tripId: 't16293',
    driverId: 'b8123',
    userId: 'u6123',
    isPink: true
  });

  let latitude = 27.66;
  let longitude = -66.71;

  it('should stop trip', (done) => {
    request(app)
      .put(`/stopTrip/${trip.tripId}/${latitude}/${longitude}`)
      .send(trip)
      .expect(200)
      .end(done);
  });
});
