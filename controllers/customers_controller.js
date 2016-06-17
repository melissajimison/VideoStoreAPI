var Customers = require("../models/customers");

var CustomersController = {
  index: function(req, res, next) {
    Customers.all(function(error, customers) { // this is a callback
      if(error) {
        var err = new Error("Error retrieving customers list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers);
        // var locals = { accounts : accounts};
        // res.render("accounts/index",locals);
        }
    });
  },

  sort: function(req, res, next) {
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
        res.json(customers);
      }
    });
  },


  current: function(req, res, next) {
    // passed the callback
    Customers.find(req.params.id, function(error, customers) { // calling the find method on customers
      if(error) {
        var err = new Error ("No checkout information");
        err.status = 404;
        next(err);
      } else {
        res.json(movies);
      }
    });
  };
}


module.exports = CustomersController;
