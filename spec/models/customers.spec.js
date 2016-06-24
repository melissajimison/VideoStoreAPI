var app = require("../../app");
var db = app.get("db");

var Customers = require('../../models/customers');
var Movies = require('../../models/customers');

describe('Customers', function () {
  afterEach(function () {
    db.end();
  });

  describe('#all', function () {
    it('should return an array of customer instances', function (done) {
      Customers.all(function (error, customers) {
        expect(error).toBeNull
        expect(customers).toEqual(jasmine.any(Array));
        expect(customers.length).toEqual(200);
        done();
      });
    });
  });
});
