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

History.get_customer_ids = function(rental_ids, callback) {
  db.history.find({rental_id: rental_ids}, function(error, histories) {
    if(error || !histories) {
      callback(error || new Error("Could not retrieve histories"), undefined);
    } else {
      callback(null, histories.map(function(history) {
        var history = new History(history);
        return history.customer_id;
      }));
    }
  })
}


module.exports = History;
