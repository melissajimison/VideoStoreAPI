var app = require("../app");
var db = app.get("db");
var Customers = require('../models/customers');

// Constructor function
var Rentals = function(rental) {
  this.id = rental.id;
  this.movie_id = rental.movie_id;
  this.customer_id = rental.customer_id;
  this.status = rental.status;

};
// find the movies by customer id
// an array of customer ids
Rentals.find_by_customer = function(customer_id, callback) {
                    // key value that matches one of the column names in the rentals TABLE
                    // value is the specific value that we want to look for in the table
  db.rentals.find({customer_id : customer_id}, function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve your movies"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        return new Rentals(rental);
      }));
    }
  });
};

// when movies are returned the customer id will be deleted from the rentals table

Rentals.available = function(movie_id, callback){
  db.rentals.find({movie_id : movie_id, status: "available"}, function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.length);
    }
  });
};

//Melissa is using this. dont delete
Rentals.find_customers_by_title = function(title, callback) {
  db.sql.rentals.currentCustomers([title], function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customers(customer);
      }));
    };
  });
};

Rentals.mark_as_checkout = function(movie, customer_id, callback) {
  // movie = "Jaws"
  db.run("UPDATE rentals AS r SET customer_id = $1, status = 'rented' FROM movies AS m WHERE r.movie_id = (SELECT id FROM movies WHERE title=$2) RETURNING * ", [customer_id, movie], function(error, rental_count){
    if(error) {
      callback(error, undefined)
    } else {
      callback(null, rental_count)
    };
  });
};
module.exports = Rentals
