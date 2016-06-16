var Rentals = require("../models/movies");

show: function(req, res, next) {
  Rental.find(req.params.id, function(error, account) {
    if(error) {
      var err = new Error("No such account");
      err.status = 404;
      next(err);
    } else {
      account.getBalance(function(error, balance) {
        res.render("accounts/show", {
          account: {
            id: account.id,
            balance: balance
          }
        });
      });
    }
  });
}
};
module.exports = RentalsController;
