var request = require('request');
var base_url = "http://localhost:3000/";

describe("Endpoint at /", function () {
  var url = function(endpoint) {
    return base_url + "movies" + endpoint;
  };

  it('responds with a 200 status code', function (done) {
    request.get(url('/'), function(error, response, body) {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });
});

describe("Endpoint at /sort", function () {
  var url = function(endpoint) {
    return base_url + "movies/sort" + endpoint;
  };

  it('responds with a 200 status code', function (done) {
    request.get(url('/title?n=10&p=1'), function(error, response, body) {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('responds with a 200 status code released_date', function (done) {
    request.get(url('/release_date?n=6&p=1'), function(error, response, body) {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('responds with a 200 status code for mispelling', function (done) {
    request.get(url('/released-date?n=10&p=1'), function(error, response, body) {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });
});
