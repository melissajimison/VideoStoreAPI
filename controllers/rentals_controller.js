var Rentals = require('../models/rentals');
var Movies = require("../models/movies");

var RentalsController = {

find_movie: function(req, res, next) {
  var movie = req.params.title;

  Movies.find(movie, function(error, found_movie) {
    if(error) {
      var err = new Error("No such movie");
      err.status = 404;
      next(err);
    } else {
      obj = {}
      obj['Synopsis'] = found_movie.overview;
      obj['Release Date'] = found_movie.release_date;
      obj['Total Inventory'] = found_movie.inventory;
      Rentals.available(found_movie.id, function(err, number){
        obj['Available Inventory'] = number
        res.json(obj);
      });
    }
  });
}
};
// declaring as a javascript object

module.exports = RentalsController;
