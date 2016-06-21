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

History.getPastRentalHistory = function(customer_id, callback) {
  db.run("SELECT customer_id, checkout_date, return_date FROM history WHERE customer_id=$1 AND returned=$2 ORDER BY return_date ASC", [customer_id, true], function(error, history) {
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, history);
    }
  });
};


module.exports = History;
