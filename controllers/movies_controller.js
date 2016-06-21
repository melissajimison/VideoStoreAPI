var Movies = require("../models/movies");
var Rentals = require('../models/rentals');
var Customers = require('../models/customers');

var MoviesController = {
  index: function(req, res, next) {
    Movies.all(function(error, movies) { // this is a callback
      if(error) {
        var err = new Error("Error retrieving movies list:\n" + error.message);
        err.status = 404;
        next(err);
      } else {
        var obj = {};
        if (movies.length === 0) {
          obj["status"] = 204;
        } else {
          obj["status"] = 200;
        }
        obj["movies"] = movies;
        res.json(obj);
      }
    });
  },

  sort: function(req, res, next) {
    // // GET /search?q=tobi+ferret
    // req.query.q
    // // => "tobi ferret"

    //Send in an ORDER clause and a LIMIT with OFFSET
    var options = {
      limit : req.query.n,
      order : req.params.column,
      offset: req.query.p
    };

    // products ordered in descending fashion
    Movies.sort_by(options, function(error, movies) { // this is a callback
      if(error) {
        var err = new Error("No such movie");
        err.status = 404;
        next(err);
      } else {
        var obj = {};
        if (movies.length === 0) {
          obj["status"] = 204;
        } else {
          obj["status"] = 200;
        }
        obj["movies"] = movies;
        res.json(obj);
      }
    });
  },

  current: function(req, res, next) {
    var movie = req.params.title;

    Movies.find_customers_by_title(movie, function(error, customers) {
      if(error) {
        var err = new Error("No such movie");
        err.status = 404;
        next(err);
      } else {
        var obj = {};
        if (customers.length === 0) {
          obj["status"] = 204;
        } else {
          obj["status"] = 200;
        }
        obj["customers"] = customers;
        res.json(obj);
      }
    })
  },

  history: function(req, res, next) {
    var movie = req.params.title;
    var column = req.params.column;
    var order_by;

    if (column === 'name') {
      order_by = 'name';
    } else if (column === 'checkout_date') {
      order_by = 'checkout_date';
    }

    console.log(order_by);

    Movies.find_customers_by_history(movie, order_by, function(error, customers) {
      if(error) {
        var err = new Error("No such movie: " + error.message);
        err.status = 404;
        next(err);
      } else {
        var obj = {};
        if (customers.length === 0) {
          obj["status"] = 204;
        } else {
          obj["status"] = 200;
        }
        obj["customers"] = customers;
        res.json(obj);
      }
    })
  }
};

module.exports = MoviesController;

