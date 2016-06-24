var app = require("../app");
var db = app.get("db");
var Customers = require('../models/customers');

// Constructor function
var Movies = function(movie) {
  this.id = movie.id;
  this.title = movie.title;
  this.overview = movie.overview;
  this.release_date = movie.release_date;
  this.inventory = movie.inventory;
};

Movies.all = function(callback) {
  db.movies.find(movies_callback(callback));
};

Movies.sort_by = function(options, callback) {
  db.movies.find({}, options, movies_callback(callback));
};

Movies.find = function(title, callback) {
  db.movies.findOne({title: title}, function(error, movie) {
    if(error || !movie) {
      callback(error || new Error("Could not retrieve movie"), undefined);
    } else {
      callback(null, new Movies(movie));
    }
  });
};

Movies.find_customers_by_title = function(title, callback) {
  db.sql.movies.currentCustomers([title], customer_callback(callback));
}

Movies.find_customers_by_history = function(title, order_by, callback) {
  if (order_by === 'name') {
    db.sql.movies.historyCustomersByName(title, customer_callback(callback));
  } else if (order_by === 'checkout_date') {
    db.sql.movies.historyCustomersByDate(title, customer_callback(callback));
  } else {
    db.sql.movies.historyCustomersDefault(title, customer_callback(callback));
  }
}

function customer_callback(passed_callback) {
  return function(error, customers) {
    if(error || !customers) {
      passed_callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      passed_callback(null, customers.map(function(customer) {
        return new Customers(customer);
      }));
    }
  };
}

function movies_callback(passed_callback) {
  return function(error, movies) {
    if(error || !movies) {
      passed_callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      passed_callback(null, movies.map(function(movie) {
        return new Movies(movie);
      }));
    }
  };
}

module.exports = Movies;
