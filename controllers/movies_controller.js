var Movies = require("../models/movies");
var Rentals = require('../models/rentals');
var Customers = require('../models/customers');

var MoviesController = {
  index: function(req, res, next) {
    Movies.all(callback(res, "movies"));
  },

  sort: function(req, res, next) {
    var order_by = req.params.column;
    var options = {
      limit : req.query.n,
      offset: req.query.p
    };
    
    if (order_by === "release_date" || order_by === "release-date") {
      options["order"] = "release_date";
    } else if (order_by === "title") {
      options["order"] = "title";
    } else {
      options["order"] = "id";
    }

    Movies.sort_by(options, callback(res, "movies"));
  },

  current: function(req, res, next) {
    var movie = req.params.title;
    Movies.find_customers_by_title(movie, callback(res, "customers"));
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

    Movies.find_customers_by_history(movie, order_by, callback(res, "customers"));
  }
};

function callback(res, type) {
  return function(error, result) { // this is a callback
    if(error) {
      var err = new Error("Error retrieving results:\n" + error.message);
      err.status = 500;
      res.render(err);
    } else {
      var obj = {};
      if (result.length === 0) {
        obj["status"] = 204;
      } else {
        obj["status"] = 200;
      }
      obj[type] = result;
      res.json(obj);
    }
  }
}

module.exports = MoviesController;

