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
  db.run("SELECT customer_id, checkout_date, return_date FROM history WHERE customer_id=$1 ORDER BY return_date ASC", [customer_id], function(error, history) {
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, history);
    }
  });
};

History.create_record = function(rental_id, customer_id, callback) {
  db.history.save({rental_id: rental_id, customer_id: customer_id, checkout_date: new Date().toLocaleDateString(), return_date: make_return_date()}, function(error,inserted){
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, new History(inserted));
    }
  });
}

function make_return_date() {
  var date = new Date();
  var return_days = 10;
  date.setDate(date.getDate() + return_days); 
  return date.toLocaleDateString();
}


module.exports = History;
