var massive = require('massive');
var connectionString = "postgres://localhost/videoStore";
var db = massive.connectSync({connectionString : connectionString});
var data_movies = require('../db/seeds/movies.json');
var data_customers = require('../db/seeds/customers.json');

for (var record of data_movies) {
  db.movies.saveSync(record);
  db.movies.find({title: record.title}, function(err, res){
    for (i = 0; i < record.inventory; i++) {
      db.rentals.saveSync({movie_id: res[0].id })
    };
  });
};

for (var record of data_customers) {
  db.customers.saveSync(record)
};

process.exit( );