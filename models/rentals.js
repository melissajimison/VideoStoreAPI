var app = require("../app");
var db = app.get("db");
var Customers = require('../models/customers');

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

Rentals.available = function(movie_id, callback){
  db.rentals.find({movie_id : movie_id, status: "available"}, function(error, rentals) {
    if(error || !rentals) {
      callback(error || new Error("Could not retrieve rentals"), undefined);
    } else {
      callback(null, rentals.length);
    }
  });
};

//Melissa is using this. dont delete
Rentals.find_customers_by_title = function(title, callback) {
  db.sql.rentals.currentCustomers([title], function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customers(customer);
      }));
    };
  });
};

Rentals.mark_as_checkout = function(movie, customer_id, callback) {
  db.sql.rentals.checkout([customer_id, movie], function(error, result){
    if(error) {
      callback(error, undefined)
    } else {
      Rentals.update_custumer_credit(result, customer_id, callback)
    };
  });
};

Rentals.update_custumer_credit = function (result, customer_id, callback) {
  var bonus = 0.50
  var customer_id = Number(customer_id)
  db.sql.rentals.updatecustomer([bonus, customer_id], function (error, customer_updated) {
    if (error) {
      callback(error, undefined)
    } else {
      callback(null, result, customer_updated)
    };
  });
};

Rentals.get_overdue = function(callback) {
  var today = new Date().toLocaleDateString();
  db.sql.history.overdue([today], function(error, customers) {
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, customers);
    }
  })
};

Rentals.return_rental = function(customer_id, movie, callback){
  //reach into the movies table, look by title, get movie_id, go to rentals, see that movie_id and customer_id matches
  //change the status to available and delete the costumer-id or set it to cero

  db.sql.rentals.retunMovie([customer_id, movie], function(error, updated_rental) {
    if(error || !updated_rental) {
      callback(error || new Error("Could not retrieve updated_rental"), undefined);
    } else {
      callback(null, updated_rental);
    }
  });
};

module.exports = Rentals
