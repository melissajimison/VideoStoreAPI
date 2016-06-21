var request = require('request');
var base_url = "http://localhost:3000/";


describe("Endpoint at /", function () {
  var url = function(endpoint) {
    return base_url + "rentals" + endpoint;
  };

  it('responds with a 200 status code for succesful request', function (done) {
    request.get(url('/Jaws'), function(error, response, body) {
      var body_parsed = JSON.parse(body)
      expect(response.statusCode).toEqual(200)
      expect(typeof body).toEqual("string")
      expect(typeof body_parsed).toEqual("object")
      expect(body_parsed["status"]).toEqual(200)
      expect(body_parsed["Movie Info"]["Synopsis"]).toEqual(jasmine.any(String))
      expect(body_parsed["Movie Info"]["Release Date"]).toEqual("1975-06-19")
      expect(body_parsed["Movie Info"]["Total Inventory"]).toEqual(6)
      expect(body_parsed["Movie Info"]["Available Inventory"]).toEqual(4)
      done();
    });
  });

  it('responds with a 204 status code for no data', function (done) {
    request.get(url('/Titanic'), function(error, response, body) {
      var body_parsed = JSON.parse(body)
      expect(response.statusCode).toEqual(200)
      expect(typeof body).toEqual("string")
      expect(typeof body_parsed).toEqual("object")
      expect(body_parsed["Movie Info"]["Synopsis"]).toEqual(jasmine.any(String))
      expect(body_parsed["Movie Info"]["Release Date"]).toEqual("1997-12-19")
      expect(body_parsed["Movie Info"]["Total Inventory"]).toEqual(5)
      expect(body_parsed["Movie Info"]["Available Inventory"]).toEqual(5)
      done();
    });
  });

  // it('responds with a 404 status code for bad request', function (done) {
  //   request.get(url('/Melissa'), function(error, response, body) {
  //     var body_parsed = JSON.parse(body)
  //     expect(response.statusCode).toEqual(200)
  //     expect(typeof body).toEqual("string")
  //     expect(typeof body_parsed).toEqual("object")
  //     done();
  //   });
  // });

});
