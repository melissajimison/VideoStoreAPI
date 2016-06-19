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

module.exports = History;
