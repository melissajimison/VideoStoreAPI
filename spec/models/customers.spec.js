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

  describe('#sort_by', function () {
      var options_release = {
        limit : 5,
        order : 'name',
        offset: 1
      };


    it('should return an array of 5 Customers if limit is set to 5', function (done) {
      Movies.sort_by(options_release, function (error, movies) {
        expect(error).toBeNull;
        expect(movies).toEqual(jasmine.any(Array));
        expect(movies.length).toEqual(5);
        done();
      });
    });
  });
});
