var Movies = require("../models/movies");
var Rentals = require('../models/rentals');
var Customers = require('../models/customers');
var History = require('../models/history');

var MoviesController = {
  index: function(req, res, next) {
    Movies.all(function(error, movies) { // this is a callback
      if(error) {
        var err = new Error("Error retrieving movies list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies);
        // var locals = { accounts : accounts};
        // res.render("accounts/index",locals);
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
    Movies.sort_by_day(options, function(error, movies) { // this is a callback
      if(error) {
        var err = new Error("No such movie");
        err.status = 404;
        next(err);
      } else {
        res.json(movies);
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
        res.json(customers);
      }
    })

    // Movies.find(movie, function(error, found_movie) {
    //   if(error) {
    //     var err = new Error("No such movie");
    //     err.status = 404;
    //     next(err);
    //   } else {
    //     Rentals.get_customer_ids(found_movie.id, function(error, customer_ids) {
    //       if(error) {
    //         var err = new Error("No such rentals");
    //         err.status = 404;
    //         next(err);
    //       } else {
    //         Customers.find(customer_ids, function(error, customers) {
    //           if(error) {
    //             var err = new Error("No such customers");
    //             err.status = 404;
    //             next(err);
    //           } else {
    //             res.json(customers);
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
  },

  history: function(req, res, next) {
    var movie = req.params.title;
    var column = req.params.column;

    Movies.find_customers_by_history(movie, function(error, customers) {
      if(error) {
        var err = new Error("No such movie");
        err.status = 404;
        next(err);
      } else {
        res.json(customers);
      }
    })
  }
};

module.exports = MoviesController;

