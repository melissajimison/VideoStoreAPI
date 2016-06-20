var app = require("../app");
var db = app.get("db");

// Constructor function
var History = function(history) {
  this.id = history.id;
  this.rental_id = history.rental_id;
  this.customer_id = history.customer_id;
  this.checkout_date = history.checkout_date;
  this.return_date = history.return_date;

};

History.find_by_customer_id = function(ids, callback) {
  db.customers.find({id: ids}, function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve information"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new History(customer);
      }));
    }
  });
};
};

module.exports = History;
