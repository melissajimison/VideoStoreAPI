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
  }
};

module.exports = CustomersController;
