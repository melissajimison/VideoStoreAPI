var app = require("../../app");
var db = app.get("db");

var Movies = require('../../models/movies');
var Customers = require('../../models/customers');

describe('Movies', function () {
  var options_release = {
    limit : 5,
    order : 'release_date',
    offset: 1
  };

  var options_title = {
    limit : 5,
    order : 'title',
    offset: 1
  };

  afterEach(function () {
    db.end();
  });

  describe('#all', function () {
    it('should return an array of 100 Movie instances', function (done) {
      Movies.all(function (error, movies) {
        expect(error).toBeNull;
        expect(movies).toEqual(jasmine.any(Array));
        expect(movies.length).toEqual(100);
        done();
      });
    });
  });

  describe('#sort_by', function () {

    it('should return an array of 5 Movies if limit is set to 5', function (done) {
      Movies.sort_by(options_release, function (error, movies) {
        expect(error).toBeNull;
        expect(movies).toEqual(jasmine.any(Array));
        expect(movies.length).toEqual(5);
        done();
      });
    });

    it('should return The Phantom of the Opera first when sorted by release_date', function (done) {
      Movies.sort_by(options_release, function (error, movies) {
        expect(error).toBeNull;
        expect(movies[0].title).toEqual("The Phantom of the Opera");
        expect(movies[0].id).toEqual(83);
        done();
      });
    });


    it('should return 2001: A Space Odyssey first when sorted by title', function (done) {
      Movies.sort_by(options_title, function (error, movies) {
        expect(error).toBeNull;
        expect(movies[0].title).toEqual("2001: A Space Odyssey");
        expect(movies[0].id).toEqual(40);
        done();
      });
    });
  });

  describe('#find', function () {
    it('should return a Movie', function (done) {
      Movies.find("Jaws", function (error, movie) {
        expect(error).toBeNull;
        expect(movie.title).toEqual("Jaws");
        expect(movie.release_date).toEqual("1975-06-19");
        expect(movie.inventory).toEqual(6);
        expect(movie.overview).toEqual("An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.");
        done();
      });
    });
  });

  describe('#find_customers_by_title', function() {
    it('should return an Array of Customer instances', function(done) {
      Movies.find_customers_by_title("Jaws", function(error, customers) {
        expect(error).toBeNull;
        expect(customers).toEqual(jasmine.any(Array));
        expect(customers[0]).toEqual(jasmine.any(Customers));
        done();
      });
    });

    it('should return only name, phone, and account_credit info for each customer', function(done) {
      Movies.find_customers_by_title("Jaws", function(error, customers) {
        expect(customers[0].name).toNotBe(undefined);
        expect(customers[0].phone).toNotBe(undefined);
        expect(customers[0].account_credit).toNotBe(undefined);
        done();
      });
    });
  });

  describe('#find_customers_by_history', function() {
    it('should return an Array of Customer instances', function(done) {
      Movies.find_customers_by_history("Jaws", "name", function(error, customers) {
        expect(error).toBeNull;
        expect(customers).toEqual(jasmine.any(Array));
        expect(customers[0]).toEqual(jasmine.any(Customers));
        done();
      });
    });

    it('can order by name', function(done) {
      Movies.find_customers_by_history("Psycho", "name", function(error, customers) {
        expect(customers[0].id).toEqual(4);
        expect(customers[customers.length-1].id).toEqual(1);
        done();
      });
    });

    it('can order by checkout_date', function(done) {
      Movies.find_customers_by_history("Psycho", "checkout_date", function(error, customers) {
        expect(customers[0].id).toEqual(4);
        expect(customers[customers.length-1].id).toEqual(3);
        done();
      });
    });

    it('orders by id by default if an invalid sort column was given', function(done) {
      Movies.find_customers_by_history("Psycho", "blahblahblah", function(error, customers) {
        expect(customers[0].id).toEqual(1);
        expect(customers[customers.length-1].id).toEqual(11);
        done();
      });
    });
  });
});

