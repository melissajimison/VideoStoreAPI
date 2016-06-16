var app = require("../app");
var db = app.get("db");
var data_movies = require('../db/seeds/movies.json');
var data_customers = require('../db/seeds/customers.json');

for (var record of data_movies) {

  // this is a single record:
  // "title": "Psycho",
  // "overview": "When larcenous real estate clerk Marion Crane goes on the lam with a wad of cash and hopes of starting a new life, she ends up at the notorious Bates Motel, where manager Norman Bates cares for his housebound mother. The place seems quirky, but fine… until Marion decides to take a shower.",
  // "release_date": "1960-06-16",
  // "inventory": 8
  // },

  // saving the instance of movie to the database
  // once saved, its given an id
  db.movies.saveSync(record);
  db.movies.find({title: record.title}, function(err, res) {
    for (i = 0; i < record.inventory; i++) {
      db.rentals.saveSync({movie_id: res[0].id });
    }
  });
}

for (var record of data_customers) {

  // this is a record:
  // {
  // "name": "Shelley Rocha",
  // "registered_at": "Wed, 29 Apr 2015 07:54:14 -0700",
  // "address": "Ap #292-5216 Ipsum Rd.",
  // "city": "Hillsboro",
  // "state": "OR",
  // "postal_code": "24309",
  // "phone": "(322) 510-8695",
  // "account_credit": 13.15
  // },
  db.customers.saveSync(record);
}

process.exit( );
