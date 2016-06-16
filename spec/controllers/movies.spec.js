var request = require('request');
var base_url = "http://localhost:3000";

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
