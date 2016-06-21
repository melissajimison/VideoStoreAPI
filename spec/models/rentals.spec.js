var app = require("../../app");
var db = app.get("db");
var Rentals = require('../../models/rentals')

afterEach(function () {
  // delete all the accounts I created
  db.end()
})

describe('#available', function () {
  it('should return number of rentals available', function (done) {
    var movie_id = 33;
    Rentals.available(movie_id, function (error, aval) {
      expect(error).toBeNull
      expect(aval).toEqual(9)
      done()
    })
  })

  it('should return number of rentals available', function (done) {
    var movie_id = 2;
    Rentals.available(movie_id, function (error, aval) {
      expect(error).toBeNull
      expect(aval).toEqual(4)
      done()
    })
  })
})
