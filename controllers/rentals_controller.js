var Rentals = require('../models/rentals');
var Movies = require("../models/movies");
var Customers = require("../models/customers");
var History = require("../models/history");

var RentalsController = {

  find_movie: function(req, res, next) {
    var movie = req.params.title;

    Movies.find(movie, function(error, found_movie) {
      if(error) {
        var err = new Error("No such movie");
        err.status = 404;
        next(err);
      } else {
        obj = {}
        obj['status'] = 200;
        obj['Movie Info'] = {};
        obj['Movie Info']['Synopsis'] = found_movie.overview;
        obj['Movie Info']['Release Date'] = found_movie.release_date;
        obj['Movie Info']['Total Inventory'] = found_movie.inventory;
        Rentals.available(found_movie.id, function(err, number){
          obj['Movie Info']['Available Inventory'] = number
          res.json(obj);
        });
      }
    });
  },

  current_customers: function(req, res, next) {
    var movie = req.params.title;

    Rentals.find_customers_by_title(movie, function(error, customers) {
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

  checkout: function(req, res, next) {
    var customer_id = req.params.id;
    var movie = req.params.title;


    Rentals.mark_as_checkout (movie, customer_id, function(error, rental_array, customer_updated) {
      if(error) {
        var err = new Error(error.message);
        err.status = 404;
        next(err);
      } else {
        var rental_id = rental_array[0].id
        History.create_record(rental_id, customer_id, function(error, history_result) {
          if(error) {
            var err = new Error(error.message);
            err.status = 404;
            next(err);
          } else {
            obj = {}
            obj["Status"] = 200;
            obj["Message"] = "Checkout has been processed succesfully"
            obj["Return day"] = history_result["return_date"]
            obj["Customer's Name"] = customer_updated[0]["name"]
            obj["Customer's Credit"] = customer_updated[0]["account_credit"]

            res.json(obj);
          }
        });
      }
    });
  },

  // include customer name, movie title, check-out date, and return date
  overdue: function(req, res, next) {
    Rentals.get_overdue(function(error, customers) {
      if(error) {
        var err = new Error(error.message);
        err.status = 500;
        next(err);
      } else {
        obj = {};
        if (customers.length === 0) {
          obj["status"] = 204;
        } else {
          obj["status"] = 200;
        }
        obj["customers"] = customers
        res.json(obj);
      }
    })
  },

  return_a_rental: function(req, res, next) {
    var customer_id = req.params.id;
    var movie = req.params.title;
    Rentals.return_rental(customer_id, movie, function(error, updated_rental) {
      if(error) {
        var err = new Error(error.message);
        err.status = 404;
        next(err);
      } else {
        obj = {}
        obj["Status"] = 200;
        obj["Message"] = "Return has been processed succesfully"
        obj["Rental info"] = updated_rental[0]
        res.json(obj);
      }
    })
  }
};

module.exports = RentalsController;
