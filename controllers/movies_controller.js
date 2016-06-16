var Movies = require("../models/movies");

var MoviesController = {
  index: function(req, res, next) {
    Movies.all(function(error, movies) { // this is a callback
      if(error) {
        var err = new Error("Error retrieving movies list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies);
        // var locals = { accounts : accounts};
        // res.render("accounts/index",locals);
        }
    });
  }
};

module.exports = MoviesController;
