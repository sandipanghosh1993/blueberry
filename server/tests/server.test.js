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
