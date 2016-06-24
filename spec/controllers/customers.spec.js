var request = require('request');
var base_url = "http://localhost:3000/";


describe("Endpoint at /", function () {
  var url = function(endpoint) {
    return base_url + "customers" + endpoint;
  };

  it('responds with a 200 status code', function (done) {
    request.get(url('/'), function(error, response, body) {
      expect(JSON.parse(body).status).toEqual(200);
      done();
    });
  });

  it('the returned json data has the right keys', function(done) {
    request.get('/', function(error, response, body) {
      // var data = JSON.parse(body);
      expect(body).toEqual("melissa");
      expect(Object.keys(data)).toEqual(['']);
      done();
    });
  });
});
