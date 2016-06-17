var app = require("../app");
var db = app.get("db");

// Constructor function
var Movies = function(movie) {
  this.id = movie.id;
  this.title = movie.title;
  this.overview = movie.overview;
  this.release_date = movie.release_date;
  this.inventory = movie.inventory;
};

Movies.all = function(callback) {
  db.movies.find(function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movies(movie);
      }));
    }
  });
};

Movies.sort_by_day = function(options, callback) {
  db.movies.find({}, options, function(error, movies){
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined);
    } else {
      callback(null, movies.map(function(movie) {
        return new Movies(movie);
      }));
    }
  });
};

Movies.find = function(title, callback) {
  db.movies.findOne({title: title}, function(error, movie) {
    if(error || !movie) {
      callback(error || new Error("Could not retrieve movie"), undefined);
    } else {

      callback(null, new Movies(movie));
    }
  });
}

module.exports = Movies;
