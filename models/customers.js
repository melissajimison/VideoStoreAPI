var app = require("../app");
var db = app.get("db");

// Constructor function
var Customers = function(customer) {
  this.id = customer.id;
  this.name = customer.name;
  this.registered_at = customer.registered_at;
  this.address = customer.address;
  this.city = customer.city;
  this.state = customer.state;
  this.postal_code = customer.postal_code;
  this.phone = customer.phone;
  this.account_credit = customer.account_credit;
};

Customers.all = function(callback) {
  db.customers.find(function(error, customers) {
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customers(customer);
      }));
    }
  });
};

Customers.sort_by = function(options, callback) {
  db.customers.find({}, options, function(error, customers){
    if(error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map(function(customer) {
        return new Customers(customer);
      }));
    }
  });
};










module.exports = Customers;
