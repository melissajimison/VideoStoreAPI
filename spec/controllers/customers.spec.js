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
});

  describe("Endpoint at /sort", function() {
    var url = function(endpoint) {
      return base_url + "customers/sort" + endpoint;
    };

    it('responds with a 200 status code for a valid url', function(done) {
      request.get(url('/name?n=10&p=2'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(200);
        done();
      });
    });

    it('responds with a 200 status code for a valid url', function(done) {
      request.get(url('/registered_at?n=10&p=2'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(200);
        done();
      });
    });

    it('responds with a 200 status code for a valid url', function(done) {
      request.get(url('/postal_code?n=10&p=2'), function(error, response, body) {
        expect(JSON.parse(body).status).toEqual(200);
        done();
      });
    });
});
