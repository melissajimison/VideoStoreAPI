var app = require("../app");
var db = app.get("db");

// Constructor function
var Rentals= function(id) {
  this.id = id;
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
