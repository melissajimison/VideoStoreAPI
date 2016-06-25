var request = require('request');
var base_url = "http://localhost:3000/";

describe('RentalsController', function() {
  var url = function(endpoint) {
    return base_url + "rentals" + endpoint;
  };

  describe("Endpoint at /Jaws", function () {
    it('responds with a 200 status code for succesful request', function (done) {
      request.get(url('/Jaws'), function(error, response, body) {
        var body_parsed = JSON.parse(body)
        expect(response.statusCode).toEqual(200)
        expect(typeof body).toEqual("string")
        expect(typeof body_parsed).toEqual("object")
        expect(body_parsed["status"]).toEqual(200)
        done();
      });
    });

    it('response with an object with movie and rental information', function (done) {
      request.get(url('/Jaws'), function(error, response, body) {
        var body_parsed = JSON.parse(body)
        expect(body_parsed["Movie Info"]["Synopsis"]).toEqual(jasmine.any(String))
        expect(body_parsed["Movie Info"]["Release Date"]).toEqual("1975-06-19")
        expect(body_parsed["Movie Info"]["Total Inventory"]).toEqual(6)
        expect(body_parsed["Movie Info"]["Available Inventory"]).toEqual(4)
        done();
      });
    });

  });

  describe("Endpoint at /Titanic", function () {
    it('responds with a 200 status code for succesful request', function (done) {
      request.get(url('/Titanic'), function(error, response, body) {
        var body_parsed = JSON.parse(body)
        expect(response.statusCode).toEqual(200)
        expect(typeof body).toEqual("string")
        expect(typeof body_parsed).toEqual("object")
        expect(body_parsed["status"]).toEqual(200)
        done();
      });
    });

    it('response with an object with movie and rental information', function (done) {
      request.get(url('/Titanic'), function(error, response, body) {
        var body_parsed = JSON.parse(body)
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
  //
  });

  describe("Endpoint at /Jaws/customers", function () {

    it('responds with a 200 status code for succesful request', function (done) {
      request.get(url('/Jaws/customers'), function(error, response, body) {
        var body_parsed = JSON.parse(body)
        expect(response.statusCode).toEqual(200)
        expect(typeof body).toEqual("string")
        expect(typeof body_parsed).toEqual("object")
        expect(body_parsed["status"]).toEqual(200)
      done();
      });
    });

    it('responds with all customers info, for succesful request', function (done) {
      request.get(url('/Jaws/customers'), function(error, response, body) {
        var body_parsed = JSON.parse(body)
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
  });

  describe("Endpoint at /Titanic/customers", function () {

    it('responds with a 204 status for not data found', function (done) {
      request.get(url('/Titanic/customers'), function(error, response, body) {
        var body_parsed = JSON.parse(body)
        expect(response.statusCode).toEqual(200)
        expect(typeof body).toEqual("string")
        expect(typeof body_parsed).toEqual("object")
        expect(body_parsed["status"]).toEqual(204)
        done();
      });
    });

    it('responds with a empty array, for not data found', function (done) {
      request.get(url('/Titanic/customers'), function(error, response, body) {
        var body_parsed = JSON.parse(body)
        expect(body_parsed["customers"]).toEqual(jasmine.any(Array))
        expect(body_parsed["customers"]).toEqual([])
        done();
      });
    });
  });

  // describe("Endpoint at /Notorious/check-out", function () {
  //   it('responds with a 200 status code, for succesful request', function (done) {
  //     request.post(url('/Notorious/check-out/100'), function(error, response, body) {
  //       var body_parsed = JSON.parse(body)
  //       expect(response.statusCode).toEqual(200)
  //       expect(typeof body).toEqual("string")
  //       expect(typeof body_parsed).toEqual("object")
  //       expect(body_parsed).toEqual(200)
  //       done();
  //     });
  //   });

    // it('responds with a Message for succesful request', function (done) {
    //   request.post(url('/Alien/check-out/100'), function(error, response, body) {
    //     var body_parsed = JSON.parse(body)
    //     expect(typeof body_parsed).toEqual("object")
    //     expect(body_parsed["Message"]).toEqual("Checkout has been processed succesfully")
    //     expect(typeof body_parsed["Message"]).toEqual("string")
    //     expect(body_parsed["Customer's Name"]).toEqual("Barbara Jacobson")
    //     expect(body_parsed["Return day"]).toEqual("string")
    //     expect(body_parsed["Customer's Credit"]).toEqual("13.91")
    //     done();
    //   });
    // });
  // });
});
