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

  it('responds with a 200 status code, and all movie info, for succesful request', function (done) {
    request.get(url('/Titanic'), function(error, response, body) {
      var body_parsed = JSON.parse(body)
      expect(response.statusCode).toEqual(200)
      expect(typeof body).toEqual("string")
      expect(typeof body_parsed).toEqual("object")
      expect(body_parsed["status"]).toEqual(200)
      expect(body_parsed["Movie Info"]["Synopsis"]).toEqual(jasmine.any(String))
      expect(body_parsed["Movie Info"]["Release Date"]).toEqual("1997-12-19")
      expect(body_parsed["Movie Info"]["Total Inventory"]).toEqual(5)
      expect(body_parsed["Movie Info"]["Available Inventory"]).toEqual(5)
      done();
    });
  });

  // it('responds with a 404 status code for bad request', function (done) {
  //   request.get(url('/Melissa'), function(error, response, body) {
  // //     var body_parsed = JSON.parse(body)
  // //     expect(response.statusCode).toEqual(200)
  // //     expect(typeof body).toEqual("string")
  // //     expect(typeof body_parsed).toEqual("object")
  // //     done();
  //   });
  // });

});

describe("Endpoint at /", function () {
  var url = function(endpoint) {
    return base_url + "rentals" + endpoint;
  };

  it('responds with a 200 status code, and all customers info, for succesful request', function (done) {
    request.get(url('/Jaws/customers'), function(error, response, body) {
      var body_parsed = JSON.parse(body)
      expect(response.statusCode).toEqual(200)
      expect(typeof body).toEqual("string")
      expect(typeof body_parsed).toEqual("object")
      expect(body_parsed["status"]).toEqual(200)
      expect(body_parsed["customers"]).toEqual(jasmine.any(Array))
      expect(body_parsed["customers"][0]["name"]).toEqual("Curran Stout")
      expect(body_parsed["customers"][0]["registered_at"]).toEqual("Wed, 16 Apr 2014 21:40:20 -0700")
      expect(body_parsed["customers"][0]["address"]).toEqual("Ap #658-1540 Erat Rd.")
      expect(body_parsed["customers"][0]["city"]).toEqual("San Francisco")
      expect(body_parsed["customers"][0]["state"]).toEqual("California")
      expect(body_parsed["customers"][0]["postal_code"]).toEqual("94267")
      expect(body_parsed["customers"][0]["phone"]).toEqual("(908) 949-6758")
      expect(body_parsed["customers"][0]["account_credit"]).toEqual("35.66")
      done();
    });
  });

  it('responds with a 200 status code, but 204 response status for not data found', function (done) {
    request.get(url('/Titanic/customers'), function(error, response, body) {
      var body_parsed = JSON.parse(body)
      expect(response.statusCode).toEqual(200)
      expect(typeof body).toEqual("string")
      expect(typeof body_parsed).toEqual("object")
      expect(body_parsed["status"]).toEqual(204)
      expect(body_parsed["customers"]).toEqual(jasmine.any(Array))
      expect(body_parsed["customers"]).toEqual([])
      done();
    });
  });

});
