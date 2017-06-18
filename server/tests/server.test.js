const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {Trip} = require('./../models/trip');
const uuidv4 = require('uuid/v4');

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

  let tripId = uuidv4();

  it('should start trip', (done) => {
    request(app)
      .put(`/startTrip/${tripId}`)
      .expect(200)
      .end(done);
  });
});

describe('PUT /stopTrip/:tripId/:latitude/:longitude', () => {

  let tripId = uuidv4();
  let latitude = 27.66;
  let longitude = -66.71;

  it('should stop trip', (done) => {
    request(app)
      .put(`/stopTrip/${tripId}/${latitude}/${longitude}`)
      .expect(200)
      .end(done);
  });
});
