var app = require("../app");
var db = app.get("db");

var data_movies = require('../db/seeds/movies.json');
var data_customers = require('../db/seeds/customers.json');
var data_history = require('../db/seeds/history.json');

for (var record of data_movies) {
  db.movies.saveSync(record);
}

for (var record of data_history) {
  db.history.saveSync(record);
};

db.movies.find(function(err, res){
  for (var movie of res) {
    for (i = 0; i < movie.inventory; i++) {
      db.rentals.saveSync({movie_id: movie.id, status: 'available' });
    }
  }
});

for (var record of data_customers) {
  db.customers.saveSync(record);
}

db.rentals.saveSync({id: [33, 9, 15], status: 'rented', customer_id: 2})
db.rentals.saveSync({id: [2, 10, 21], status: 'rented', customer_id: 4})

process.exit( );
