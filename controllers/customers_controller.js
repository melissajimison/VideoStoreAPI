var Customers = require("../models/customers");
var Rentals = require("../models/rentals");
var History = require("../models/history");

var CustomersController = {
  index: function(req, res, next) {
    Customers.all(function(error, customers) { // this is a callback
      if(error) {
        var err = new Error("Error retrieving customers list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        var obj = {};
        if (customers.length === 0) {
          obj["status"] = 204;
        } else {
          obj["status"] = 200;
        }
      }
      obj["customers"] = customers;
      res.json(obj);
    });
  },

  // the word phone breaks the code:
  sort: function(req, res, next) {
    if(req.params.column === "name" || req.params.column === "registered_at" || req.params.column === "postal_code") {

      //Send in an ORDER clause and a LIMIT with OFFSET
      var options = {
        limit : req.query.n,
        order : req.params.column,
        offset: req.query.p
      };
    // products ordered in descending fashion
    // takes 2 parameters
    // options and the callback fucntion
      Customers.sort_by(options, function(error, customers) { // this will return and array of customers
        if(error) {
          var err = new Error("No such customer");
          err.status = 404;
          next(err);
        } else {
          var obj = {};
          if (customers.length === 0) {
            obj["status"] = 204;
          } else {
            obj["status"] = 200;
        }
        obj["customers"] = customers;
        res.json(obj);
        }
      });
    } else {
      var obj = {};
      obj["status"] = 400;
      obj["message"] = "invalid request";
      res.json(obj);
    }
  },
  // this is a property whose value is a function (this is now a method)
  // this is the response from node
  current: function(req, res, next) {
    //model has a find method that takes in 2 arguments (id, callback function)
    Rentals.find_by_customer(req.params.id, function(error, rentals) {
      if(error) {
        var err = new Error("No such account");
        err.status = 404;
        next(err);
      } else {
        res.json(rentals); // write out the rentals as json
      }
    });
  },

  history: function(req, res, next) {
    //model has a find method that takes in 2 arguments (id, callback function)
    History.getPastRentalHistory(req.params.id, function(error, history) {
      if(error) {
        var err = new Error("No history at this store");
        err.status = 404;
        next(err);
      } else {
        var obj = {};
        if (history.length === 0) {
          obj["status"] = 204;
        } else {
          obj["status"] = 200;
        }
        obj["history"] = history;
        res.json(obj); // write out the history as json
      }
    });
  }
};

module.exports = CustomersController;
