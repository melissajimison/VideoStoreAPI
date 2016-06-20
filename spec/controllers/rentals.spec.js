var request = require('request');
var base_url = "http://localhost:3000/";


describe("Endpoint at /Jaws", function () {
  var url = function(endpoint) {
    return base_url + "rentals" + endpoint;
  };

  it('responds with a 200 status code for succesful request', function (done) {
    request.get(url('/Jaws'), function(error, response, body) {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('responds with a 204 status code for no data', function (done) {
    request.get(url('/Titanic'), function(error, response, body) {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('responds with a 404 status code for bad request', function (done) {
    request.get(url('/Melissa'), function(error, response, body) {
      expect(response.statusCode).toEqual(404);
      done();
    });
  });

});
