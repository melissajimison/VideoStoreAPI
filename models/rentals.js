var app = require("../app");
var db = app.get("db");

// Constructor function
var Rentals= function(id) {
  this.id = id;
};

// find the movies by customer id
// an array of customer ids
Rentals.sort_by = function(options, callback) {
  db.rentals.find({}, options, function(error, rentals){
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve your movies"), undefined);
    } else {
      callback(null, customers.map(function(rental) {
        return new Movies(rentals.movie.id);
      }));
    }
  });
};


// Customers.all = function(callback) {
//   db.customers.find(function(error, customers) {
//     if(error || !customers) {
//       callback(error || new Error("Could not retrieve customers"), undefined);
//     } else {
//       callback(null, customers.map(function(customer) {
//         return new Customers(customer.id);
//       }));
//     }
//   });
// };


module.exports = Rentals;
