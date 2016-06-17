var app = require("../app");
var db = app.get("db");

// Constructor function
var Rentals = function(rentals) {
  this.id = rentals.id;
  this.customer_id = rentals.customer_id;
  this.movie_id = rentals.movie_id;
  this.status = rentals.status;
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
