var app = require("../app");
var db = app.get("db");

// Constructor function
var Rentals = function(rental) {
  this.id = rental.id;
  this.movie_id = rental.movie_id;
  this.customer_id = rental.customer_id;
  this.status = rental.status;
};

Rentals.get_rentals = function(movie_id, callback) {
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


module.exports = Rentals;
