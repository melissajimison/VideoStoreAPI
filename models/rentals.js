var app = require("../app");
var db = app.get("db");

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

Rentals.get_customer_ids = function(movie_id, callback) {
  db.rentals.find({movie_id: movie_id}, function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        var rental = new Rentals(rental);
        return rental.customer_id;
      }));
    }
  })
}

Rentals.available = function(movie_id, callback){
  db.rentals.find({movie_id: movie_id}, function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.length);
    }
  });
}

Rentals.get_customer_ids_of_rented = function(movie_id, callback) {
                    // key value that matches one of the column names in the rentals TABLE
                    // value is the specific value that we want to look for in the table
  db.rentals.find({movie_id : movie_id, status: "rented"}, function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve your rentals"), undefined);
    } else {
      callback(null, rentals.map(function(rental) {
        var rental = new Rentals(rental);
         return rental.customer_id
      }));
    }
  });
};

module.exports = Rentals;
